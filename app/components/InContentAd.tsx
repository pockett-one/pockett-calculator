'use client';

import AdSenseAd from './AdSenseAd';

interface InContentAdProps {
  /**
   * Ad slot ID for the in-content ad
   */
  adSlot?: string;
  
  /**
   * Ad size - defaults to responsive for better mobile experience
   */
  adSize?: '300x250' | 'responsive';
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Show label above ad
   */
  showLabel?: boolean;
}

/**
 * InContentAd Component
 * 
 * Displays ads within content areas (below the fold).
 * Best practice: Place after main content sections to avoid
 * interfering with user experience.
 * 
 * @example
 * // After calculator section
 * <InContentAd adSlot="1234567890" />
 * 
 * @example
 * // With label
 * <InContentAd adSlot="1234567890" showLabel />
 */
export default function InContentAd({
  adSlot,
  adSize = 'responsive',
  className = '',
  showLabel = false,
}: InContentAdProps) {
  if (!adSlot) {
    return (
      <div className={`flex items-center justify-center bg-gray-50 border border-gray-200 rounded my-8 ${className}`} style={{ minHeight: '250px' }}>
        <div className="text-center p-4">
          {showLabel && (
            <div className="text-xs font-bold text-gray-400 mb-2">Advertisement</div>
          )}
          <div className="text-xs text-gray-400">In-content ad slot not configured</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`my-8 flex justify-center ${className}`}>
      <div className="w-full max-w-md">
        {showLabel && (
          <div className="text-xs font-bold text-gray-400 mb-2 text-center">Advertisement</div>
        )}
        <AdSenseAd
          adSlot={adSlot}
          adSize={adSize}
          fullWidthResponsive={adSize === 'responsive'}
          className="w-full"
        />
      </div>
    </div>
  );
}

