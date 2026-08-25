export type UserTier = 'free' | 'unlocked';

export interface TierLimits {
  maxFileSize: number; // in bytes
  maxBatchSize: number; // number of files
  allowedFormats: string[]; // empty means all
  apiAccess: boolean;
  adFree: boolean;
  priorityProcessing: boolean;
}

export const TIER_CONFIGS: Record<UserTier, TierLimits> = {
  free: {
    maxFileSize: 20 * 1024 * 1024, // 20 MB base limit
    maxBatchSize: 5,
    allowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'zip', 'csv', 'json', 'txt', 'md'],
    apiAccess: false,
    adFree: false,
    priorityProcessing: false,
  },
  unlocked: {
    maxFileSize: 1024 * 1024 * 1024, // 1 GB unlocked limit via Ads
    maxBatchSize: 50,
    allowedFormats: [], // all formats
    apiAccess: false,
    adFree: false,
    priorityProcessing: false,
  },
};

class MonetizationService {
  private currentTier: UserTier = 'free';

  public getTier(): UserTier {
    return this.currentTier;
  }

  public setTier(tier: UserTier) {
    this.currentTier = tier;
    console.log(`[Monetization] Active tier switched to: ${tier}`);
  }

  public getLimits(): TierLimits {
    return TIER_CONFIGS[this.currentTier];
  }

  /**
   * Check if a file is within size limits.
   * If it exceeds the 20MB limit but is under 1GB, we return that it requires an ad.
   */
  public checkFileSize(size: number): { allowed: boolean; requiresAd: boolean; error?: string } {
    const freeLimit = TIER_CONFIGS.free.maxFileSize;
    const unlockedLimit = TIER_CONFIGS.unlocked.maxFileSize;

    if (size <= freeLimit) {
      return { allowed: true, requiresAd: false };
    }

    if (size <= unlockedLimit) {
      return { 
        allowed: true, 
        requiresAd: true, 
        error: `Files over 20MB require watching a short sponsored ad to process locally.` 
      };
    }

    const maxGb = Math.round(unlockedLimit / (1024 * 1024 * 1024));
    return {
      allowed: false,
      requiresAd: false,
      error: `File size exceeds the maximum system limit of ${maxGb}GB. Please upload a smaller file.`,
    };
  }

  public checkBatchSize(count: number): { allowed: boolean; error?: string } {
    const limits = this.getLimits();
    if (count > limits.maxBatchSize) {
      return {
        allowed: false,
        error: `Batch size exceeds the limit of ${limits.maxBatchSize} files. Please process fewer files at a time.`,
      };
    }
    return { allowed: true };
  }
}

export const monetization = new MonetizationService();
