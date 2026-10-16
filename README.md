# E-commerce React Assessment

Custom React storefront built with Vite, React Context API, Lucide icons, and custom CSS. No UI framework or slider library is used.

## Requirements
- Node.js 18+ recommended
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```

## Features
- Products fetched from Fake Store API
- Session cache for product data
- Debounced product-name search
- Category filtering and sorting by price, name, and rating
- Custom autoplay hero slider with previous/next and dots
- Cart context with quantities, subtotal, remove action, and localStorage persistence
- Wishlist context with localStorage persistence
- Cart and wishlist modal/drawer
- Newsletter form validation and success feedback
- Responsive custom CSS, loading and error states

## Notes
- The checkout button is a demo placeholder; no payment is processed.
- Product catalog images/content come from Fake Store API, so they will not exactly match the static product images in the supplied reference screenshot. The layout follows its visual direction.
- The hero artwork is CSS/emoji illustration so no missing local banner asset is required. Replace it with provided approved assets if they are supplied separately.


## Supplied local assets
The provided logo, two hero banners, newsletter background, electric kettle photo, and Bluetooth speaker photo are stored in `public/Image/` and used in the corresponding UI sections. The kettle and speaker are added as featured local products; products from Fake Store API are still fetched and displayed after them.
