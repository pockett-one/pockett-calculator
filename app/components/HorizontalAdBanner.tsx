'use client';

import AdBanner from './AdBanner';

/**
 * HorizontalAdBanner Component
 * 
 * Displays a horizontal ad banner below the header on all pages.
 * Uses AdBanner component with responsive ad sizes.
 * 
 * To configure: Set NEXT_PUBLIC_ADSENSE_TOP_BANNER_SLOT environment variable
 * or pass adSlot prop directly.
 */
export default function HorizontalAdBanner() {
  // Get ad slot from environment variable or use default
  // You can create separate ad units in AdSense dashboard for different placements
  const topBannerAdSlot = process.env.NEXT_PUBLIC_ADSENSE_TOP_BANNER_SLOT;

  return (
    <AdBanner 
      adSlot={topBannerAdSlot}
      // Optional: Use different slots for desktop and mobile
      // desktopAdSlot={process.env.NEXT_PUBLIC_ADSENSE_DESKTOP_TOP_BANNER}
      // mobileAdSlot={process.env.NEXT_PUBLIC_ADSENSE_MOBILE_TOP_BANNER}
    />
  );
}

