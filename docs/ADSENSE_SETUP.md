# Google AdSense Integration Guide

This guide explains how to set up and configure Google AdSense ads on your Pockett Calculator website.

## 📋 Prerequisites

1. **Google AdSense Account**: Sign up at [adsense.google.com](https://adsense.google.com)
2. **Approved Website**: Your site must be approved by Google AdSense
3. **AdSense Publisher ID**: Format: `ca-pub-XXXXXXXXXX` (already configured)

## 🔧 Environment Variables Setup

### Required Variables

Add these to your `.env.local` file (for local development) and Vercel environment variables:

```bash
# AdSense Client ID (Publisher ID)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=<Google AdSense Client Id>

# Ad Slot IDs (create these in AdSense dashboard)
NEXT_PUBLIC_ADSENSE_TOP_BANNER_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=0987654321
NEXT_PUBLIC_ADSENSE_FOOTER_SLOT=1122334455
NEXT_PUBLIC_ADSENSE_IN_CONTENT_SLOT=5566778899
```

### Vercel Setup

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add each variable above
4. Make sure to set them for **Production**, **Preview**, and **Development** environments
5. Redeploy your application

## 📄 ads.txt File Setup

### What is ads.txt?

**ads.txt** (Authorized Digital Sellers) is a text file that:
- ✅ **Prevents ad fraud** by declaring authorized ad sellers for your domain
- ✅ **Increases revenue** by ensuring ads are sold through legitimate channels
- ✅ **Required by Google AdSense** for better ad serving and higher earnings
- ✅ **Improves transparency** in the programmatic advertising ecosystem

### Why It Matters

Without ads.txt:
- ❌ Ad networks may reject or limit ad serving
- ❌ Lower revenue potential
- ❌ Risk of unauthorized sellers claiming your inventory
- ❌ Google AdSense may show warnings in your dashboard

### Implementation

The `ads.txt` file has been created in `/public/ads.txt` and will be automatically served at:
```
https://pockettcalculator.com/ads.txt
```

### How to Configure

1. **Get Your AdSense Publisher ID**
   - Format: `ca-pub-XXXXXXXXXX` (e.g., `ca-pub-3067287177469436`)
   - Found in your AdSense dashboard under **Account** → **Account Information**

2. **Update the ads.txt File**
   
   Open `/public/ads.txt` and replace the placeholder:
   
   ```txt
   google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
   ```
   
   With your actual publisher ID (remove the `ca-pub-` prefix):
   
   ```txt
   google.com, pub-3067287177469436, DIRECT, f08c47fec0942fa0
   ```
   
   **Format Explanation:**
   - `google.com` - Google's domain
   - `pub-3067287177469436` - Your publisher ID (without `ca-pub-` prefix)
   - `DIRECT` - Direct relationship with Google
   - `f08c47fec0942fa0` - Google's certification authority ID (fixed value)

3. **Verify the File**
   
   After deployment, verify it's accessible:
   - Visit: `https://pockettcalculator.com/ads.txt`
   - Should display your ads.txt content
   - Check in AdSense dashboard: **Account** → **Account Information** → **ads.txt status**

4. **Google Verification**
   - Google will automatically crawl your ads.txt file
   - Verification typically takes 24-48 hours
   - Check status in AdSense dashboard

### ads.txt File Format

```txt
# Comments start with #
# Format: <DOMAIN>, <PUBLISHER_ID>, <RELATIONSHIP>, <CERTIFICATION_AUTHORITY_ID>

google.com, pub-3067287177469436, DIRECT, f08c47fec0942fa0
```

**Important Rules:**
- ✅ One entry per line
- ✅ No spaces around commas
- ✅ Publisher ID format: `pub-` + numbers (remove `ca-pub-` prefix)
- ✅ Must be accessible at root domain: `/ads.txt`
- ✅ Must be served as `text/plain` content type
- ✅ Case-sensitive

### Adding Multiple Ad Networks

If you use other ad networks, add them to ads.txt:

```txt
google.com, pub-3067287177469436, DIRECT, f08c47fec0942fa0
example-network.com, publisher-id-123, DIRECT, cert-id-456
another-network.com, pub-789, RESELLER, cert-789
```

### Troubleshooting

**File Not Found (404)**
- ✅ Ensure file is in `/public/ads.txt`
- ✅ Verify file is deployed to production
- ✅ Check file name is exactly `ads.txt` (lowercase)

**Google Not Recognizing**
- ✅ Wait 24-48 hours for Google to crawl
- ✅ Verify file is accessible without authentication
- ✅ Check publisher ID is correct (remove `ca-pub-` prefix)
- ✅ Ensure no extra spaces or formatting issues

**Wrong Publisher ID Format**
- ❌ Wrong: `ca-pub-3067287177469436`
- ✅ Correct: `pub-3067287177469436` (remove `ca-pub-` prefix)

### Best Practices

1. **Keep it Updated**: Update ads.txt when adding/removing ad networks
2. **Monitor Status**: Check AdSense dashboard regularly for ads.txt status
3. **Version Control**: Keep ads.txt in your repository for tracking
4. **Test Locally**: Verify file is accessible before deploying
5. **HTTPS Required**: File must be accessible via HTTPS in production

## 📦 Ad Components

### 1. AdSenseAd (Base Component)

The core component for displaying AdSense ads with different sizes.

```tsx
import AdSenseAd from './components/AdSenseAd';

// Desktop Leaderboard (728x90)
<AdSenseAd adSlot="1234567890" adSize="728x90" />

// Mobile Banner (320x50)
<AdSenseAd adSlot="1234567890" adSize="320x50" />

// Medium Rectangle (300x250)
<AdSenseAd adSlot="1234567890" adSize="300x250" />

// Responsive Ad
<AdSenseAd adSlot="1234567890" adSize="responsive" fullWidthResponsive />
```

### 2. AdBanner (Top Banner)

Responsive horizontal banner that automatically shows:
- **Desktop**: 728x90 Leaderboard
- **Mobile**: 320x50 Mobile Banner

```tsx
import AdBanner from './components/AdBanner';

<AdBanner adSlot="1234567890" />

// Or use separate slots for desktop/mobile
<AdBanner 
  desktopAdSlot="1234567890" 
  mobileAdSlot="0987654321" 
/>
```

**Current Usage**: Used in `HorizontalAdBanner` component (appears below header on all pages)

### 3. SidebarAd (Right Sidebar)

Displays 300x250 Medium Rectangle ads in the sidebar.

```tsx
import SidebarAd from './components/SidebarAd';

// Single ad
<SidebarAd adSlot="1234567890" />

// Multiple stacked ads
<SidebarAd adSlot="1234567890" count={3} />
```

**Current Usage**: Used in `CalculatorLayout` component (right sidebar on calculator pages)

### 4. InContentAd (Below the Fold)

For placing ads within content areas, below the fold.

```tsx
import InContentAd from './components/InContentAd';

// Responsive ad (recommended)
<InContentAd adSlot="1234567890" adSize="responsive" />

// Fixed size rectangle
<InContentAd adSlot="1234567890" adSize="300x250" showLabel />
```

## 📍 Ad Placement Strategy

### Current Implementations

1. **Top Banner** (`HorizontalAdBanner`)
   - Location: Below header, above main content
   - Size: 728x90 (desktop) / 320x50 (mobile)
   - Visibility: All pages
   - Environment Variable: `NEXT_PUBLIC_ADSENSE_TOP_BANNER_SLOT`

2. **Sidebar Ads** (`CalculatorLayout` & `LegalPageLayout`)
   - Location: Right sidebar on calculator and legal pages
   - Size: 300x250 (Medium Rectangle)
   - Count: 3 ads on calculator pages, 2 ads on legal pages
   - Visibility: Desktop only (hidden on mobile)
   - Environment Variable: `NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT`

3. **Footer Banner** (`Footer`)
   - Location: Above footer content, at bottom of page
   - Size: 728x90 (desktop) / 320x50 (mobile)
   - Visibility: All pages (only shows if slot is configured)
   - Environment Variable: `NEXT_PUBLIC_ADSENSE_FOOTER_SLOT`

### Recommended Additional Placements

4. **In-Content Ads** (Below the fold)
   - Location: After calculator section, before related calculators
   - Size: Responsive or 300x250
   - Best Practice: Place after main content to avoid interfering with UX
   - Environment Variable: `NEXT_PUBLIC_ADSENSE_IN_CONTENT_SLOT`

5. **Homepage Sidebar** (`app/page.tsx`)
   - Currently has placeholder ad slots
   - Can be updated to use `SidebarAd` component
   - Can reuse `NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT` or create separate slot

## 🎯 Best Practices

### 1. Ad Placement Guidelines

✅ **DO:**
- Place ads below the fold (after main content)
- Use responsive ads for better mobile experience
- Maintain spacing between ads and content
- Test on both desktop and mobile devices

❌ **DON'T:**
- Place ads too close to calculator interface
- Overload pages with too many ads
- Place ads above the fold on calculator pages (interferes with UX)
- Encourage users to click ads

### 2. Ad Density

- **Maximum 3 ads per page** (recommended by AdSense)
- Current implementation: 1 top banner + 3 sidebar ads = 4 total (consider reducing)
- **Suggestion**: Remove 1 sidebar ad or make top banner conditional

### 3. Mobile Optimization

- Use responsive ad sizes when possible
- Test ad visibility on mobile devices
- Ensure ads don't block calculator functionality
- Consider hiding sidebar ads on mobile (already implemented)

### 4. Performance

- Ads load asynchronously (won't block page load)
- Uses `afterInteractive` strategy for optimal performance
- AdSense script is loaded once in root layout

## 🔍 Creating Ad Units in AdSense Dashboard

1. Log in to [Google AdSense](https://adsense.google.com)
2. Go to **Ads** → **By ad unit**
3. Click **+ New ad unit**
4. Choose ad format:
   - **Display ads** → **Responsive** (recommended)
   - Or specific sizes: 728x90, 300x250, 320x50
5. **Name your ad unit descriptively** (e.g., "Top Banner - Desktop", "Sidebar Rectangle - Calculator Pages", "Footer Banner")
   - Good naming helps you track performance and manage multiple ad units
   - Example naming convention: `[Location] - [Size] - [Page Type]`
6. Copy the **Ad unit ID** (numbers only, e.g., `1234567890`)
7. Add it to your environment variables

### 📝 About Ad Slot IDs

**Important**: Google AdSense automatically generates numeric ad slot IDs (e.g., `1234567890`). You cannot customize these IDs - they are assigned by Google.

**However**, you should use **descriptive names** when creating ad units in the AdSense dashboard:

✅ **Good Ad Unit Names:**
- `Top Banner - Desktop/Mobile`
- `Sidebar Rectangle - Calculator Pages`
- `Footer Banner - All Pages`
- `In-Content - Responsive`

❌ **Bad Ad Unit Names:**
- `Ad 1`
- `Test`
- `New Ad Unit`

**Why descriptive names matter:**
- Easier to identify which ad is performing well in reports
- Better organization when managing multiple ad units
- Helps track revenue by placement
- Makes it easier to optimize underperforming ads

**The slot ID itself** (the number) is just an identifier - it doesn't need to be "better" than basic numbers. What matters is:
1. **Naming in AdSense dashboard** - Use descriptive names
2. **Environment variable names** - Use clear, descriptive variable names (already done: `NEXT_PUBLIC_ADSENSE_TOP_BANNER_SLOT`)
3. **Documentation** - Keep track of which slot ID corresponds to which placement

**Best Practice**: Create a simple mapping document:
```
Top Banner:     NEXT_PUBLIC_ADSENSE_TOP_BANNER_SLOT = 1234567890
Sidebar:        NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT = 0987654321
Footer:         NEXT_PUBLIC_ADSENSE_FOOTER_SLOT = 1122334455
In-Content:     NEXT_PUBLIC_ADSENSE_IN_CONTENT_SLOT = 5566778899
```

## 🧪 Testing

### Local Development

1. Add environment variables to `.env.local`
2. Restart your development server
3. Check browser console for any AdSense errors
4. Verify ads appear (may show test ads initially)

### Production Testing

1. Deploy to Vercel with environment variables set
2. Wait for AdSense to crawl your site (may take 24-48 hours)
3. Check AdSense dashboard for impressions
4. Monitor ad performance and adjust placement as needed

## 🐛 Troubleshooting

### Ads Not Showing

1. **Check Environment Variables**
   - Verify `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set
   - Verify ad slot IDs are correct
   - Restart dev server after adding env vars

2. **Check AdSense Dashboard**
   - Ensure ad units are active
   - Check if site is approved
   - Verify ad unit IDs match your code

3. **Browser Console**
   - Look for AdSense errors
   - Check if script is loading: `window.adsbygoogle` should exist

4. **Ad Blockers**
   - Disable ad blockers for testing
   - Test in incognito mode

### Common Issues

- **"AdSense script not loaded"**: Check `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set
- **"Ad slot not configured"**: Check ad slot environment variables
- **Ads not responsive**: Use `adSize="responsive"` with `fullWidthResponsive={true}`

## 📊 Monitoring Performance

1. **AdSense Dashboard**
   - View impressions, clicks, and revenue
   - Identify best-performing ad units
   - Adjust placement based on data

2. **Google Analytics**
   - Track user behavior around ads
   - Monitor bounce rate (too many ads may increase it)

3. **Page Speed**
   - Use PageSpeed Insights to ensure ads don't slow down site
   - Monitor Core Web Vitals

## 🔄 Next Steps

1. **Create Ad Units in AdSense**
   - Top Banner (728x90 / 320x50) - `NEXT_PUBLIC_ADSENSE_TOP_BANNER_SLOT`
   - Sidebar Rectangle (300x250) - `NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT`
   - Footer Banner (728x90 / 320x50) - `NEXT_PUBLIC_ADSENSE_FOOTER_SLOT`
   - In-Content (Responsive) - `NEXT_PUBLIC_ADSENSE_IN_CONTENT_SLOT` (optional)

2. **Add Environment Variables**
   - Local: `.env.local`
   - Vercel: Project Settings → Environment Variables

3. **Test Implementation**
   - Verify ads appear correctly
   - Test on mobile and desktop
   - Check ad performance

4. **Optimize Placement**
   - Monitor user engagement
   - Adjust ad density if needed
   - A/B test different placements

## 📝 Component Reference

### AdSenseAd Props

```typescript
interface AdSenseAdProps {
  adSlot: string;                    // Required: Ad unit ID
  adSize?: '728x90' | '300x250' | '320x50' | 'responsive' | 'auto';
  width?: number;                    // Custom width
  height?: number;                   // Custom height
  className?: string;                // Additional CSS classes
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  fullWidthResponsive?: boolean;     // Full width for responsive ads
}
```

### AdBanner Props

```typescript
interface AdBannerProps {
  desktopAdSlot?: string;            // Desktop ad slot
  mobileAdSlot?: string;             // Mobile ad slot
  adSlot?: string;                   // Single ad slot for both
  className?: string;
}
```

### SidebarAd Props

```typescript
interface SidebarAdProps {
  adSlot?: string;                   // Ad unit ID
  className?: string;
  count?: number;                    // Number of ads to display (default: 1)
}
```

### InContentAd Props

```typescript
interface InContentAdProps {
  adSlot?: string;                   // Ad unit ID
  adSize?: '300x250' | 'responsive';
  className?: string;
  showLabel?: boolean;               // Show "Advertisement" label
}
```

## 🎉 Success!

Once configured, your ads will:
- ✅ Load automatically on all pages
- ✅ Be responsive for mobile and desktop
- ✅ Follow AdSense best practices
- ✅ Not interfere with calculator functionality
- ✅ Generate revenue from your traffic

For questions or issues, refer to [Google AdSense Help Center](https://support.google.com/adsense).

