import React from 'react';

export default function HorizontalAdBanner() {
  return (
    <div className="w-full bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop: 728x90 Leaderboard */}
        <div className="hidden md:block">
          <div className="ad-slot mx-auto" style={{ maxWidth: '728px', height: '90px' }}>
            <div className="text-center">
              <div className="text-xs font-bold text-gray-400 mb-1">Advertisement</div>
              <div className="text-xs text-gray-400">Google AdSense - Leaderboard (728x90)</div>
            </div>
          </div>
        </div>
        
        {/* Mobile: 320x50 Mobile Banner */}
        <div className="md:hidden">
          <div className="ad-slot mx-auto" style={{ maxWidth: '320px', height: '50px' }}>
            <div className="text-center">
              <div className="text-xs font-bold text-gray-400 mb-1">Advertisement</div>
              <div className="text-xs text-gray-400">Google AdSense - Mobile (320x50)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

