'use client';

import AdSenseAd from './AdSenseAd';

interface SidebarAdProps {
  /**
   * Ad slot ID for the sidebar ad (300x250)
   */
  adSlot?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Show multiple ad units (stacked)
   */
  count?: number;
}

/**
 * SidebarAd Component
 * 
 * Displays 300x250 Medium Rectangle ads in the sidebar.
 * Perfect for desktop right sidebar placement.
 * 
 * @example
 * <SidebarAd adSlot="1234567890" />
 * 
 * @example
 * <SidebarAd adSlot="1234567890" count={3} />
 */
export default function SidebarAd({
  adSlot,
  className = '',
  count = 1,
}: SidebarAdProps) {
  if (!adSlot) {
    return (
      <div className={`space-y-6 ${className}`}>
        {Array.from({ length: count }).map((_, index) => (
          <div 
            key={index}
            className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded"
            style={{ minHeight: '250px' }}
          >
            <div className="text-center">
              <div className="text-xs font-bold text-gray-400 mb-1">Advertisement</div>
              <div className="text-xs text-gray-400">300x250 - Ad slot not configured</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <AdSenseAd
          key={index}
          adSlot={adSlot}
          adSize="300x250"
          className="w-full"
        />
      ))}
    </div>
  );
}

