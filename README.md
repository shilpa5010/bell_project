
```
“This solution prioritises clean components based architecture  and type safety over feature completeness.”
```

# Product Catalog — Full Stack Challenge

## Overview
The application displays a list of products and allows users to add items to a wishlist. App have a provision to see the whislist through My Wishlist Page

---

## Features

### Core Features

* View product catalog
* Filter products by type
* Add and Remove products to wishlist
* Backend API for products and wishlist
* Wishlist page
* Duplicate prevention with proper error handling

---

## Tech Stack

* React (Vite)
* Material UI
* NestJS
* TypeScript
* Vitest + Testing Library
* Styled Components


---

## Getting Started

### Prerequisites

* Node.js >= 18
* pnpm >= 9

Enable pnpm (if not installed):

```bash
corepack enable
```

---

### Create a .env file

```
VITE_API_BASE_URL=http://localhost:3000/api
```

---

### Installation

```bash
pnpm install
```

---

### Running the App

```bash
pnpm dev
```

* Frontend: http://localhost:5173
* Backend: http://localhost:3000/api

---

### Running Tests

```bash
pnpm test
```

---

### Build

```bash
pnpm build
```

---

## API Endpoints

### Get and POST Products and Wishlist

```
GET /api/products
GET /api/products?type=Electronics
GET /api/wishlist
POST /api/wishlist
```

---

## Design Decisions

* **Type safety**: Shared interfaces used across frontend and backend
* **Separation of concerns**: API layer separated from UI logic
* **Error handling**: Backend returns meaningful errors (e.g. duplicate wishlist items)
* **State management**: Kept simple using React state for this scope
* **Persistence**: Wishlist stored in-memory (as per requirements)
* **StyleComponents**: To align the design with MUI components, used style components

## AI Usage

AI tools were used to:

* Assist with structuring the project
* Improve TypeScript typings

All generated code was reviewed and adapted before use.

## Scripts

| Script        | Description                           |
| ------------- | ------------------------------------- |
| `pnpm dev`    | Start frontend & backend concurrently |
| `pnpm test`   | Run all workspace tests               |
| `pnpm build`  | Build all workspaces                  |
| `pnpm lint`   | Lint all workspaces                   |
| `pnpm format` | Format code with Prettier             |


