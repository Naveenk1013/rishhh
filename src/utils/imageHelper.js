/**
 * IMAGE INTEGRATION GUIDE FOR STYLE_BY_RISHHH PORTFOLIO
 * 
 * This file provides utilities and guidance for integrating actual photos.
 */

// ================================================
// OPTION 1: LOCAL ASSETS (Recommended for MVP)
// ================================================
// 
// Simply place images in the /public/images/ folder structure:
// 
// public/
// └── images/
//     ├── hero/
//     │   └── style-reel.mp4        (Hero video)
//     ├── gallery/
//     │   ├── look-1.webp
//     │   ├── look-2.webp
//     │   └── ...
//     ├── portfolio/
//     │   ├── boss-lady/
//     │   │   ├── power-meeting.webp
//     │   │   └── ...
//     │   ├── street-luxe/
//     │   │   └── ...
//     │   └── ethereal/
//     │       └── ...
//     └── instagram/
//         ├── post-1.webp
//         └── ...
//
// Usage:
// <img src="/images/gallery/look-1.webp" alt="Description" />

// ================================================
// OPTION 2: CLOUDINARY (Recommended for Production)
// ================================================
//
// Benefits:
// - Automatic WebP conversion
// - On-the-fly resizing
// - Global CDN
// - Lazy loading built-in
//
// Setup:
// 1. Create free account at cloudinary.com
// 2. Upload images to your Media Library
// 3. Use URLs like:
//    https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/w_800,q_auto,f_auto/your-image.jpg

// Cloudinary Configuration
export const CLOUDINARY_CONFIG = {
  cloudName: 'YOUR_CLOUD_NAME', // Replace with your cloud name
  baseUrl: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/',
}

// Helper to generate optimized Cloudinary URLs
export const getCloudinaryUrl = (imagePath, options = {}) => {
  const {
    width = 'auto',
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
  } = options

  const transforms = `w_${width},q_${quality},f_${format},c_${crop}`
  return `${CLOUDINARY_CONFIG.baseUrl}${transforms}/${imagePath}`
}

// ================================================
// OPTION 3: SUPABASE STORAGE
// ================================================
//
// If you're using Supabase for other features:
// 1. Create a bucket for images
// 2. Upload via Dashboard or API
// 3. Use public URLs

// ================================================
// IMAGE OPTIMIZATION TIPS
// ================================================
//
// 1. Use WebP format for best compression (60% smaller than JPEG)
// 2. Recommended sizes:
//    - Hero: 1920x1080
//    - Gallery: 800x1000
//    - Thumbnails: 400x500
// 3. Use lazy loading (already implemented)
// 4. Consider using blur placeholder for LCP optimization

// Sample gallery data structure
export const GALLERY_DATA = {
  gallery: [
    {
      id: 1,
      title: 'Autumn Luxe',
      shape: 'blob-1',
      size: 'large',
      // Option 1: Local path
      image: '/images/gallery/autumn-luxe.webp',
      // Option 2: Cloudinary
      // image: getCloudinaryUrl('gallery/autumn-luxe', { width: 800 }),
    },
    // Add more items...
  ],
  portfolio: {
    'boss-lady': [
      { id: 1, title: 'Power Meeting', image: '/images/portfolio/boss-lady/power-meeting.webp' },
    ],
    'street-luxe': [],
    'ethereal': [],
  },
  instagram: [
    { id: 1, caption: 'Street Luxe Vibes', image: '/images/instagram/post-1.webp' },
  ],
}

// Lazy loading image component helper
export const LazyImage = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`lazy-image ${className || ''}`}
      loading="lazy"
      decoding="async"
      onLoad={(e) => e.target.classList.add('loaded')}
    />
  )
}

export default {
  CLOUDINARY_CONFIG,
  getCloudinaryUrl,
  GALLERY_DATA,
  LazyImage,
}
