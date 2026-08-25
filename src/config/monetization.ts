export type AdProviderType = 'none' | 'adsense' | 'ezoic';

export interface MonetizationConfig {
  adsEnabled: boolean;
  adProvider: AdProviderType;
  adsenseClientId?: string;
  ezoicPublisherId?: string;
  proGatingEnabled: boolean;
  freeTier: {
    maxFileSizeBytes: number; // 25 MB default
    maxBatchFiles: number;    // 5 files
    dailyLimit: number;       // unlimited for now
  };
  proTier: {
    maxFileSizeBytes: number; // 200 MB
    maxBatchFiles: number;    // 50 files
    apiAccess: boolean;
  };
}

export const MONETIZATION_CONFIG: MonetizationConfig = {
  adsEnabled: import.meta.env.VITE_ADS_ENABLED === 'true', // Defaults to false
  adProvider: (import.meta.env.VITE_AD_PROVIDER as AdProviderType) || 'none',
  adsenseClientId: import.meta.env.VITE_ADSENSE_CLIENT_ID || '',
  ezoicPublisherId: import.meta.env.VITE_EZOIC_PUBLISHER_ID || '',
  proGatingEnabled: import.meta.env.VITE_PRO_GATING_ENABLED === 'true',
  freeTier: {
    maxFileSizeBytes: 25 * 1024 * 1024,
    maxBatchFiles: 5,
    dailyLimit: 100,
  },
  proTier: {
    maxFileSizeBytes: 200 * 1024 * 1024,
    maxBatchFiles: 50,
    apiAccess: true,
  },
};
