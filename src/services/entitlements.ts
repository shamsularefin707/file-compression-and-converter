import { MONETIZATION_CONFIG } from '../config/monetization';

export interface EntitlementResult {
  allowed: boolean;
  reason?: string;
}

/**
 * Check if a file size is permitted under the active subscription entitlement tier.
 */
export function validateFileEntitlement(
  fileSizeBytes: number,
  toolMaxMB?: number,
  isProUser: boolean = false
): EntitlementResult {
  const toolLimitBytes = toolMaxMB ? toolMaxMB * 1024 * 1024 : MONETIZATION_CONFIG.freeTier.maxFileSizeBytes;
  const activeLimitBytes = isProUser 
    ? MONETIZATION_CONFIG.proTier.maxFileSizeBytes 
    : Math.min(toolLimitBytes, MONETIZATION_CONFIG.freeTier.maxFileSizeBytes);

  if (fileSizeBytes > activeLimitBytes) {
    const limitMB = Math.round(activeLimitBytes / (1024 * 1024));
    const userMB = (fileSizeBytes / (1024 * 1024)).toFixed(1);
    return {
      allowed: false,
      reason: `File size (${userMB} MB) exceeds the ${isProUser ? 'Pro' : 'Free'} limit of ${limitMB} MB.`,
    };
  }

  return { allowed: true };
}

/**
 * Returns the maximum allowed files per batch.
 */
export function getBatchLimit(isProUser: boolean = false): number {
  return isProUser ? MONETIZATION_CONFIG.proTier.maxBatchFiles : MONETIZATION_CONFIG.freeTier.maxBatchFiles;
}

/**
 * Checks if a specific feature requires a Pro subscription.
 */
export function isProFeature(featureKey: 'batch_large' | 'api_access' | 'custom_fonts'): boolean {
  if (!MONETIZATION_CONFIG.proGatingEnabled) return false;
  return featureKey === 'api_access' || featureKey === 'batch_large';
}
