# DAKSH STUDY & STATIONERY HUB

## Diwali Special Collection

A premium, responsive Diwali product showcase built with React, HTML5 and CSS3. The page focuses on product discovery and favourites only.

## Features

- Animated Diwali hero section with glowing diyas, particles and rangoli-inspired visuals
- Responsive desktop, tablet and mobile layout
- Product categories:
  - All Products
  - Traditional Mitti Ke Diye
  - Colorful Decorative Diyas
  - Diya Sets & Combos
  - Decorative Kalash & Festive Pots
  - Lakshmi Ji Idols
  - Festive Decoration
- Search across the collection
- Product cards with:
  - Uploaded product photographs
  - Descriptions and category labels
  - Animated image presentation
  - Favourite controls
  - Product detail modal
- Favourites view with live count
- Favourites persisted in browser `localStorage`
- Favourite toast notifications and empty state
- Previous/next product navigation in the detail modal
- Reduced-motion support through `prefers-reduced-motion`

## Project Files

```text
index.html   Page shell and metadata
app.js       React components, product data and interactions
styles.css   Festive theme, responsive layout and animations
*.jpeg       Uploaded product photographs
```

## Run Locally

This is a lightweight frontend without a build tool or backend at present.

From the project directory, start a local static server:

```powershell
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173
```

The page currently loads React and Babel from CDN scripts, so an internet connection is required for the CDN dependencies and remote category visuals.

## Image Sources

- Product cards use the supplied local JPEG photographs.
- Category tiles use royalty-free Unsplash image URLs.
- The category visuals are decorative references; local uploaded product images remain the source of truth for the product cards.

## Favourites

Favourite product IDs are stored under:

```text
daksh-diwali-favourites
```

in browser `localStorage`. Clearing site storage resets the favourites list.

## Scope

This version is display-only. It intentionally does not include:

- Prices
- Shopping cart
- Checkout
- Payment gateway
- Purchase functionality
- Backend or database integration

Product data is currently configured in `app.js`. A future backend can replace this static data without changing the showcase interactions.

## Accessibility

- Semantic headings and navigation
- Descriptive product image alt text
- Accessible button labels and pressed states
- Keyboard-friendly controls
- Reduced-motion fallback for users who request less animation
