import React from 'react';
import { useAds } from './AdProvider';

export type AdSlotPosition = 'top_banner' | 'sidebar' | 'content_mid' | 'bottom_footer';

interface AdSlotProps {
  position: AdSlotPosition;
  slotId?: string;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ position, slotId, className = '' }) => {
  const { adsEnabled, provider } = useAds();

  // If advertising is turned off globally, return null without rendering any layout box
  if (!adsEnabled || provider === 'none') {
    return null;
  }

  return (
    <div className={`ad-container ad-slot-${position} my-6 text-center overflow-hidden ${className}`}>
      {provider === 'adsense' && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
          data-ad-slot={slotId || '1234567890'}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}

      {provider === 'ezoic' && (
        <div id={`ezoic-pub-ad-placeholder-${slotId || '101'}`} />
      )}
    </div>
  );
};
