export interface AnalyticsEvent {
  name: string;
  params?: Record<string, any>;
}

/**
 * Privacy-conscious product telemetry tracker.
 * NEVER records file content or personal data.
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  try {
    const gaId = import.meta.env.VITE_GA_ID;
    if (typeof window !== 'undefined' && (window as any).gtag && gaId) {
      (window as any).gtag('event', eventName, params);
    }
  } catch (e) {
    // Silent fallback if analytics fail or are blocked by ad-blockers
  }
}

export function trackToolView(toolSlug: string): void {
  trackEvent('tool_viewed', { tool_slug: toolSlug });
}

export function trackConversionStart(inputFormat: string, targetFormat: string): void {
  trackEvent('conversion_started', {
    input_format: inputFormat,
    target_format: targetFormat,
  });
}

export function trackConversionSuccess(inputFormat: string, targetFormat: string, durationMs: number): void {
  trackEvent('conversion_completed', {
    input_format: inputFormat,
    target_format: targetFormat,
    duration_ms: durationMs,
  });
}

export function trackConversionFailure(inputFormat: string, targetFormat: string, errorCategory: string): void {
  trackEvent('conversion_failed', {
    input_format: inputFormat,
    target_format: targetFormat,
    error_category: errorCategory,
  });
}
