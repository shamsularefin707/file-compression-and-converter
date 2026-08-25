import React, { createContext, useContext, useEffect } from 'react';
import { MONETIZATION_CONFIG, type AdProviderType } from '../../config/monetization';

interface AdContextValue {
  adsEnabled: boolean;
  provider: AdProviderType;
}

const AdContext = createContext<AdContextValue>({
  adsEnabled: false,
  provider: 'none',
});

export const useAds = () => useContext(AdContext);

export const AdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { adsEnabled, adProvider, adsenseClientId, ezoicPublisherId } = MONETIZATION_CONFIG;

  useEffect(() => {
    // Only load external ad scripts if ADS_ENABLED is true and provider is set
    if (!adsEnabled || adProvider === 'none') return;

    if (adProvider === 'adsense' && adsenseClientId) {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    } else if (adProvider === 'ezoic' && ezoicPublisherId) {
      const script = document.createElement('script');
      script.src = `//g.ezoic.net/ezoic/sa.min.js`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, [adsEnabled, adProvider, adsenseClientId, ezoicPublisherId]);

  return (
    <AdContext.Provider value={{ adsEnabled, provider: adProvider }}>
      {children}
    </AdContext.Provider>
  );
};
