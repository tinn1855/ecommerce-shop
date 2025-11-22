# Ecommerce Shop

🌟 Modern e-commerce web app built with React, Nx, Vite, TailwindCSS, Shadcn UI, and TypeScript.

## Features

- Product listing with search, sort, and pagination
- Beautiful header & footer (Atomic Design)
- Product detail dialog with rating, reviews, color/quantity selection, add to cart/wishlist/share
- Responsive design, mobile friendly
- Loading spinner (Shadcn UI)
- Data from [FakeStoreAPI](https://fakestoreapi.com/)
- Modern UI with Shadcn, Lucide icons, TailwindCSS

## Technologies

- React + TypeScript
- Nx Monorepo
- Vite
- TailwindCSS
- Shadcn UI
- Lucide React

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Run development server

```bash
pnpm start
```

App will run at `http://localhost:4200` (or next available port).

### Build for production

```bash
pnpm build
```

## Project Structure

- `src/app/` - Main app entry
- `src/components/` - UI components (atomic design)
- `src/hook/` - Custom hooks (API, logic)
- `src/types/` - TypeScript types
- `src/styles.css` - Global styles

## API

Uses [FakeStoreAPI](https://fakestoreapi.com/) for product data.

## Contributing

Pull requests and issues are welcome!

## License

MIT
