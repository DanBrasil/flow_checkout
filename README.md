E-commerce Front-end

This is a Next.js
project bootstrapped with create-next-app
.
It is a modular and scalable e-commerce front-end, built with Next.js 13 (App Router), TypeScript, Tailwind CSS, and React, with focus on UX, accessibility, and component reusability.

🔹 Features

Product Carousel: Custom carousel with keyboard navigation and looping.

Shopping Cart Table: Displays product names, prices, actions, and total price dynamically.

Payment Options:

PIX: QR Code generated dynamically.

Boleto: Preview placeholder.

Card: Form with inputs for number, name, expiry, and CVV.

Responsive Layout: Mobile-first, flexible grid with carousel on left and table/payment on right.

Accessibility: Aria roles, labels, and keyboard navigation.

🔹 Tech Stack

Next.js 13
– SSR, SSG, CSR hybrid support.

React 18
– Functional components with hooks.

TypeScript
– Safe and scalable typing.

Tailwind CSS
– Utility-first styling, fully responsive.

Embla Carousel
– Lightweight, accessible carousel.

QRCode.react
– Generate QR codes for PIX payments.

🔹 Project Structure
/src
/app
/card
page.tsx # Shopping cart page with carousel, table, and payments
/product
[id]/page.tsx # Product details page
/components
/ui
/carousel # Reusable carousel component
/table # Reusable table component
/field # Field components for forms
/button.tsx # Generic button component
/interfaces
Product.ts # Product interface
/lib
utils.ts # Helper functions (e.g., cn utility)
/services
apiService.ts # API service mock

🔹 Getting Started

First, install dependencies:

npm install

# or

yarn install

# or

pnpm install

Run the development server:

npm run dev

# or

yarn dev

# or

pnpm dev

Open http://localhost:3000
in your browser.

🔹 Usage

Navigate to the product details page to view product info.

Add products to the cart.

On the cart page, view selected products in a carousel and table.

Remove items dynamically.

Choose payment method (PIX, Boleto, or Card) and preview the corresponding interface.

🔹 Scalability & Best Practices

Reusable UI Components: Carousel, Table, Field, and Button can be reused across the app.

Modular Design: Each page and component isolated for maintainability.

TypeScript: Strong typing ensures safety and easier scaling.

Responsive & Accessible: Mobile-first, with ARIA attributes and keyboard support.

Extensible Payment System: Ready to integrate real APIs like Stripe, PagSeguro, or MercadoPago.

Easy State Management Upgrade: Current useState can be upgraded to Redux/Zustand for global state.

🔹 Next Steps / Improvements

Integrate real backend API for products and payments.

Add authentication and user history.

Implement loading skeletons and lazy loading for performance.

Add Storybook for UI documentation.

Write unit and integration tests with Jest and React Testing Library.

Support multi-language (i18n).

🔹 Learn More

To learn more about Next.js:

Next.js Documentation

Learn Next.js

Next.js GitHub repository

🔹 Deploy on Vercel

Deploying is easy using the Vercel Platform
.
Check the Next.js deployment documentation
for details.
