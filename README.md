# Ankur Salunkhe Portfolio 

A modern, responsive portfolio website showcasing both Computer Science and Mechanical Engineering expertise. Built with Next.js, TypeScript, and Tailwind CSS with advanced performance optimizations.

## 🚀 Performance Features

- **Optimized Images**: WebP/AVIF formats with responsive sizing
- **Lazy Loading**: Intersection Observer for components and images
- **Critical Resource Preloading**: Above-the-fold content loads first
- **Bundle Optimization**: Tree-shaking and code splitting
- **Caching Strategy**: Aggressive caching for static assets

## 📱 Image Specifications

### Optimal Image Resolutions

#### Hero/Profile Images
- **Mobile**: 320×320px (1x), 640×640px (2x)
- **Tablet**: 480×480px (1x), 960×960px (2x)
- **Desktop**: 640×640px (1x), 1280×1280px (2x)
- **Format**: WebP/AVIF preferred, JPEG fallback
- **Quality**: 85-90%

#### Project Images
- **Thumbnail**: 300×225px (4:3 ratio)
- **Card View**: 400×300px (4:3 ratio)
- **Detail View**: 800×600px (4:3 ratio)
- **Retina**: 2x versions for high-DPI displays
- **Format**: WebP preferred
- **Quality**: 80-85%

#### Background Images
- **Mobile**: 800×600px
- **Desktop**: 1920×1080px
- **Format**: WebP/AVIF
- **Quality**: 75-80% (lower for backgrounds)

#### Icons/Logos
- **Small**: 32×32px
- **Medium**: 64×64px
- **Large**: 128×128px
- **Format**: SVG preferred, WebP for complex images
- **Quality**: 90%

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion (optimized)
- **Analytics**: Vercel Analytics & Speed Insights
- **State Management**: Zustand
- **Icons**: Lucide React + React Icons
- **Image Optimization**: Next.js Image + Custom optimization layer

## 📊 Performance Optimizations

### Image Management
- **Responsive Images**: Multiple sizes for different viewports
- **Modern Formats**: WebP/AVIF with JPEG fallbacks
- **Lazy Loading**: Intersection Observer API
- **Preloading**: Critical images loaded immediately
- **Compression**: Optimized quality settings per use case

### Loading Strategy
- **Critical Path**: Above-the-fold content prioritized
- **Code Splitting**: Route-based and component-based
- **Resource Hints**: Preload, prefetch, and preconnect
- **Bundle Analysis**: Tree-shaking and dead code elimination

### Caching
- **Static Assets**: 1 year cache with immutable headers
- **Images**: Aggressive caching with proper ETags
- **API Responses**: Appropriate cache headers
- **Service Worker**: Optional for offline functionality

## 🎯 Performance Targets

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms
- **Time to Interactive (TTI)**: < 3.5s

## 📁 Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── data/                  # JSON data files
├── lib/                   # Utility functions
│   ├── images/           # Image management
│   ├── performance/      # Performance utilities
│   └── ...
├── public/               # Static assets
│   └── images/          # Optimized images
└── ...
```

## 🖼 Image Optimization Guide

### For New Images

1. **Resize to target dimensions** using the specifications above
2. **Convert to WebP** for modern browsers
3. **Keep JPEG fallback** for compatibility
4. **Compress appropriately**:
   - Hero images: 85-90% quality
   - Project images: 80-85% quality
   - Background images: 75-80% quality
   - Icons: 90% quality

### Tools Recommended
- **Squoosh.app**: Online image optimization
- **ImageOptim**: Mac app for batch processing
- **TinyPNG**: Online PNG/JPEG compression
- **AVIF.io**: AVIF format conversion

## 🚀 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Analyze bundle
npm run analyze

# Type check
npm run type-check
```

## 📈 Performance Monitoring

The portfolio includes:
- **Vercel Analytics**: Real user monitoring
- **Speed Insights**: Core Web Vitals tracking
- **Custom Performance Hooks**: Component-level monitoring
- **Image Loading Metrics**: Lazy loading effectiveness

## 🔧 Configuration

### Image Optimization Settings
Edit `lib/images/image-optimization.ts` to adjust:
- Quality settings per image type
- Responsive breakpoints
- Format preferences
- Compression levels

### Performance Thresholds
Modify `lib/performance/monitoring.ts` for:
- Performance budgets
- Alert thresholds
- Metric collection

## 📱 Mobile Optimization

- **Touch-friendly**: 44px minimum touch targets
- **Responsive Images**: Appropriate sizes for mobile screens
- **Reduced Motion**: Respects user preferences
- **Offline Support**: Critical content cached
- **Fast Loading**: Optimized for 3G networks

## 🌐 Browser Support

- **Modern Browsers**: Full feature support
- **Legacy Browsers**: Graceful degradation
- **Image Formats**: WebP/AVIF with JPEG fallbacks
- **JavaScript**: Progressive enhancement

## 📄 License

MIT License - see LICENSE file for details.

## 📞 Contact

For questions or collaboration opportunities:
- Email: ankursalunkhe2004@gmail.com
- LinkedIn: [Ankur Salunkhe](https://www.linkedin.com/in/ankur-salunkhe/)
- GitHub: [AnkurSalunkhe11](https://github.com/AnkurSalunkhe11)

---

## 🎯 Performance Checklist

- ✅ Images optimized for multiple screen sizes
- ✅ WebP/AVIF formats with fallbacks
- ✅ Lazy loading implemented
- ✅ Critical resources preloaded
- ✅ Bundle size optimized
- ✅ Caching headers configured
- ✅ Core Web Vitals monitored
- ✅ Mobile-first responsive design
- ✅ Accessibility standards met
- ✅ SEO optimized
