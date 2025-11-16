'use client';

import AdSenseAd from './AdSenseAd';

interface AdBannerProps {
  /**
   * Ad slot ID for desktop leaderboard (728x90)
   */
  desktopAdSlot?: string;
  
  /**
   * Ad slot ID for mobile banner (320x50)
   */
  mobileAdSlot?: string;
  
  /**
   * Use same ad slot for both desktop and mobile
   */
  adSlot?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * AdBanner Component
 * 
 * Responsive horizontal ad banner that displays:
 * - 728x90 Leaderboard on desktop/tablet
 * - 320x50 Mobile Banner on mobile devices
 * 
 * @example
 * <AdBanner adSlot="1234567890" />
 * 
 * @example
 * <AdBanner desktopAdSlot="1234567890" mobileAdSlot="0987654321" />
 */
export default function AdBanner({
  desktopAdSlot,
  mobileAdSlot,
  adSlot,
  className = '',
}: AdBannerProps) {
  // Use single adSlot if provided, otherwise use separate desktop/mobile slots
  const desktopSlot = desktopAdSlot || adSlot;
  const mobileSlot = mobileAdSlot || adSlot;

  if (!desktopSlot && !mobileSlot) {
    return (
      <div className={`w-full bg-gray-50 border-b border-gray-200 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-xs text-gray-400">
            Ad slot not configured
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full bg-gray-50 border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop: 728x90 Leaderboard */}
        {desktopSlot && (
          <div className="hidden md:block">
            <AdSenseAd 
              adSlot={desktopSlot} 
              adSize="728x90"
              className="mx-auto"
            />
          </div>
        )}
        
        {/* Mobile: 320x50 Mobile Banner */}
        {mobileSlot && (
          <div className="md:hidden">
            <AdSenseAd 
              adSlot={mobileSlot} 
              adSize="320x50"
              className="mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}

