export type AnalyticsEvent =
  | { type: 'file_uploaded'; payload: { name: string; size: number; mimeType: string } }
  | { type: 'compression_started'; payload: { id: string; name: string; size: number; action: string } }
  | { type: 'compression_completed'; payload: { id: string; originalSize: number; outputSize: number; savedBytes: number } }
  | { type: 'conversion_started'; payload: { id: string; name: string; from: string; to: string } }
  | { type: 'conversion_completed'; payload: { id: string; name: string; from: string; to: string } }
  | { type: 'download_clicked'; payload: { id: string; name: string; size: number } }
  | { type: 'batch_download_clicked'; payload: { fileCount: number; totalSize: number } }
  | { type: 'theme_toggled'; payload: { theme: 'light' | 'dark' } };

class AnalyticsService {
  private isEnabled: boolean = false;

  constructor() {
    // In production, this can check if cookies or consent is given
    this.isEnabled = import.meta.env.PROD;
  }

  public track(event: AnalyticsEvent) {
    if (this.isEnabled) {
      // In a real application, you would send this to Google Analytics, Mixpanel, etc.
      console.log(`[Analytics] Event tracked: ${event.type}`, event.payload);
    } else {
      // Log to console in development mode for verification
      console.log(`[Dev-Analytics] Tracked: ${event.type}`, event.payload);
    }
  }
}

export const analytics = new AnalyticsService();
