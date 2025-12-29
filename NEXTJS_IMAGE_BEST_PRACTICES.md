# Next.js Image Optimization Best Practices

This document outlines the image handling best practices implemented in this Next.js application.

## ✅ Current Implementation

### 1. Public Folder Structure

```
public/
├── logo.svg
└── images/
    ├── landing/
    │   ├── hero-bg.webp
    │   ├── hero-bg-2.webp
    │   ├── hero-bg-3.webp
    │   ├── benefits-bg.webp
    │   ├── categories-bg.webp
    │   ├── register-bg.webp
    │   ├── faq-bg.webp
    │   ├── news-bg.webp
    │   ├── banner-bg.webp
    │   ├── vid-kev.webp
    │   ├── logos-footer.webp
    │   └── ... (other landing images)
    └── cats/
        ├── bisuteria.webp
        ├── joyeria.webp
        ├── tejiduria.webp
        ├── telas.webp
        ├── ceramica.webp
        └── alfareria.webp
```

**✅ Best Practice:** Static assets are stored in the `public/` folder and referenced with absolute paths starting with `/`.

### 2. Next.js Image Component Usage

#### Content Images (Using `next/image`)

For images that are part of the content (logos, product images, category icons), we use the Next.js `Image` component:

```tsx
import Image from 'next/image';

// Example: Category icons
<Image 
  src="/images/cats/bisuteria.webp" 
  alt="Bisutería" 
  fill 
  className="object-cover" 
/>

// Example: Footer logo
<Image
  src="/logo.svg"
  alt="Full Colombiano"
  width={120}
  height={64}
  priority
/>
```

**✅ Best Practices Applied:**
- Using `next/image` for automatic optimization
- Using `fill` prop for responsive images in containers
- Specifying `width` and `height` for fixed-size images
- Adding `priority` for above-the-fold images
- Always including descriptive `alt` text

#### Background Images (Using CSS)

For decorative background images, we use CSS `background-image`:

```tsx
<section
  className="py-16 bg-cover bg-center"
  style={{ backgroundImage: `url('/images/landing/hero-bg.webp')` }}
>
  {/* Content */}
</section>
```

**✅ Best Practice:** Background images used for styling purposes are correctly using CSS, as they don't need the same level of optimization as content images.

### 3. Image Configuration (next.config.js)

```javascript
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'api.fullcolombiano.com',
    },
    {
      protocol: 'https',
      hostname: 'api-stg.colombiansupply.com',
    },
    {
      protocol: 'https',
      hostname: 'api.colombiansupply.com',
    },
  ],
}
```

**✅ Best Practices Applied:**
- **Modern formats**: AVIF and WebP for better compression
- **Device sizes**: Optimized breakpoints for responsive images
- **Image sizes**: Predefined sizes for common use cases
- **Remote patterns**: Whitelisted domains for external images (API)

### 4. Image Format Strategy

**Primary Format: WebP**
- All images are stored as `.webp` for optimal compression
- Smaller file sizes (25-35% smaller than JPEG)
- Better quality at lower file sizes
- Wide browser support

**Fallback: AVIF**
- Next.js automatically generates AVIF versions
- Even better compression than WebP
- Automatic fallback for browsers that don't support AVIF

### 5. Responsive Image Strategy

#### Using `fill` Prop
```tsx
<div className="relative w-full h-64">
  <Image
    src="/images/landing/vid-kev.webp"
    alt="Description"
    fill
    className="object-cover"
  />
</div>
```

**✅ Best Practice:** The `fill` prop makes images responsive to their container, eliminating layout shift.

#### Using `sizes` Prop
```tsx
<Image
  src="/images/cats/bisuteria.webp"
  alt="Bisutería"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

**✅ Best Practice:** The `sizes` prop helps Next.js determine which image size to load based on viewport.

### 6. Performance Optimizations

#### Priority Loading
```tsx
<Image
  src="/logo.svg"
  alt="Full Colombiano"
  width={120}
  height={64}
  priority // Loads immediately, no lazy loading
/>
```

**✅ Best Practice:** Use `priority` for above-the-fold images to improve LCP (Largest Contentful Paint).

#### Lazy Loading (Default)
By default, all images without `priority` are lazy-loaded, improving initial page load time.

### 7. Accessibility

All images include descriptive `alt` text:

```tsx
<Image
  src="/images/cats/bisuteria.webp"
  alt="Bisutería - Artesanías colombianas"
  fill
/>
```

**✅ Best Practice:** Descriptive alt text improves accessibility and SEO.

## 📊 Performance Benefits

With these optimizations:

1. **Automatic Format Selection**: Next.js serves WebP/AVIF to supported browsers
2. **Responsive Images**: Different sizes for different devices
3. **Lazy Loading**: Images load only when needed
4. **Optimized Compression**: Smaller file sizes without quality loss
5. **CDN Caching**: Images are cached at the edge for faster delivery

## 🔍 Verification

To verify images are being optimized:

1. Open DevTools → Network tab
2. Filter by "Img"
3. Check that images are served as WebP/AVIF
4. Verify responsive sizes are being loaded

Example URL pattern:
```
/_next/image?url=%2Fimages%2Fcats%2Fbisuteria.webp&w=384&q=75
```

## 📝 Guidelines for Adding New Images

1. **Store in `public/` folder** with organized subdirectories
2. **Use WebP format** for all new images
3. **Use `next/image`** for content images
4. **Use CSS background-image** for decorative backgrounds
5. **Always include `alt` text**
6. **Add `priority` for above-the-fold images**
7. **Use `fill` prop for responsive containers**
8. **Specify `sizes` for complex responsive layouts**

## 🚀 Additional Optimizations

### Image Compression
Before adding images to `public/`, compress them:
- Use tools like Squoosh, TinyPNG, or ImageOptim
- Target: < 200KB for hero images, < 50KB for icons

### SVG Optimization
For SVG files (like logos):
- Use SVGO to optimize
- Consider inlining small SVGs as React components

### Image CDN (Future)
Consider using a dedicated image CDN like:
- Cloudinary
- imgix
- AWS CloudFront

## 📚 References

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Image Component API](https://nextjs.org/docs/app/api-reference/components/image)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)

