'use client';

import { useEffect, useRef, useState } from 'react';

export type AdSize = 
  | '728x90'      // Leaderboard (Desktop)
  | '300x250'     // Medium Rectangle (Desktop/Mobile)
  | '320x50'      // Mobile Banner
  | 'responsive'  // Responsive ad
  | 'auto';       // Auto size

interface AdSenseAdProps {
  /**
   * Ad slot ID from Google AdSense dashboard
   * Format: "1234567890" (numbers only, no dashes)
   */
  adSlot: string;
  
  /**
   * Ad size format
   */
  adSize?: AdSize;
  
  /**
   * Custom width (for responsive ads)
   */
  width?: number;
  
  /**
   * Custom height (for responsive ads)
   */
  height?: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Ad format (optional)
   */
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  
  /**
   * Full width responsive (for responsive ads)
   */
  fullWidthResponsive?: boolean;
}

/**
 * AdSenseAd Component
 * 
 * A reusable component for displaying Google AdSense ads with proper
 * responsive handling for both desktop and mobile layouts.
 * 
 * @example
 * // Desktop Leaderboard (728x90)
 * <AdSenseAd adSlot="1234567890" adSize="728x90" />
 * 
 * @example
 * // Mobile Banner (320x50)
 * <AdSenseAd adSlot="1234567890" adSize="320x50" />
 * 
 * @example
 * // Responsive Rectangle (300x250)
 * <AdSenseAd adSlot="1234567890" adSize="300x250" />
 * 
 * @example
 * // Fully Responsive
 * <AdSenseAd adSlot="1234567890" adSize="responsive" fullWidthResponsive />
 */
export default function AdSenseAd({
  adSlot,
  adSize = 'auto',
  width,
  height,
  className = '',
  adFormat = 'auto',
  fullWidthResponsive = false,
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    // Only run on client side and if AdSense client ID is available
    if (!adsenseClientId || !adRef.current || typeof window === 'undefined') {
      return;
    }

    // Check if adsbygoogle is already initialized
    if (!window.adsbygoogle) {
      console.warn('AdSense script not loaded. Make sure NEXT_PUBLIC_ADSENSE_CLIENT_ID is set.');
      setHasError(true);
      return;
    }

    try {
      // Push ad configuration to adsbygoogle
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading AdSense ad:', error);
      setHasError(true);
    }
  }, [adsenseClientId, adSlot]);

  // Don't render if no client ID
  if (!adsenseClientId) {
    return (
      <div className={`flex items-center justify-center bg-gray-50 border border-gray-200 rounded ${className}`} style={{ minHeight: adSize === '728x90' ? '90px' : adSize === '300x250' ? '250px' : adSize === '320x50' ? '50px' : '100px' }}>
        <div className="text-center p-4">
          <div className="text-xs font-bold text-gray-400 mb-1">Advertisement</div>
          <div className="text-xs text-gray-400">AdSense not configured</div>
        </div>
      </div>
    );
  }

  // Get dimensions based on ad size
  const getAdDimensions = () => {
    switch (adSize) {
      case '728x90':
        return { width: 728, height: 90 };
      case '300x250':
        return { width: 300, height: 250 };
      case '320x50':
        return { width: 320, height: 50 };
      case 'responsive':
        return { width: '100%', height: 'auto' };
      case 'auto':
      default:
        return width && height ? { width, height } : { width: '100%', height: 'auto' };
    }
  };

  const dimensions = getAdDimensions();
  const isResponsive = adSize === 'responsive' || adSize === 'auto';

  // Container styles
  const containerStyle: React.CSSProperties = {
    minHeight: isResponsive ? undefined : typeof dimensions.height === 'number' ? `${dimensions.height}px` : undefined,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Ad styles
  const adStyle: React.CSSProperties = {
    display: 'inline-block',
    width: typeof dimensions.width === 'number' ? `${dimensions.width}px` : dimensions.width,
    height: typeof dimensions.height === 'number' ? `${dimensions.height}px` : dimensions.height,
    ...(isResponsive && fullWidthResponsive ? { width: '100%' } : {}),
  };

  return (
    <div 
      ref={adRef}
      className={`ad-container ${className}`}
      style={containerStyle}
    >
      {hasError && (
        <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded">
          <div className="text-xs font-bold text-gray-400 mb-1">Advertisement</div>
          <div className="text-xs text-gray-400">Ad failed to load</div>
        </div>
      )}
      
      {!hasError && (
        <ins
          className="adsbygoogle"
          style={adStyle}
          data-ad-client={adsenseClientId}
          data-ad-slot={adSlot}
          {...(isResponsive ? { 'data-full-width-responsive': fullWidthResponsive ? 'true' : 'false' } : {})}
          {...(adFormat !== 'auto' ? { 'data-ad-format': adFormat } : {})}
        />
      )}
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

