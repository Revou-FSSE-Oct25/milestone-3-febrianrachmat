# RevoShop — Modern E-Commerce App (Next.js)

RevoShop adalah aplikasi e-commerce modern yang dibangun menggunakan **Next.js**, dengan fitur autentikasi, shopping cart, protected checkout route menggunakan middleware.

---

# Live Features

## Authentication System

- Login menggunakan FakeStoreAPI
- Session disimpan menggunakan cookie
- Logout functionality
- Navbar menampilkan profile user setelah login

## Shopping Cart

- Add product ke cart
- Increase / decrease quantity
- Remove item
- Clear cart
- Subtotal per item
- Cart total otomatis dihitung

## Checkout System

- Protected route menggunakan Next.js middleware
- Hanya user yang login yang bisa mengakses `/checkout`
- Redirect ke `/login` jika belum login

## Modern UI

- Modern responsive navbar
- Profile avatar
- Cart badge indicator

---

# Tech Stack

- Next.js 16
- React 19
- JavaScript (ES6)
- Next.js Middleware
- React Context API
- FakeStoreAPI
- CSS (Custom styling)

---

# Rendering Strategy (Module 4)

Aplikasi ini memenuhi requirement Module 4 dengan **empat pola rendering** yang sengaja dipisah per halaman — tidak ada perubahan strategi di kode, hanya pemetaan berikut:

| Halaman | Pola | File | Implementasi |
|---------|------|------|--------------|
| `/` (Home) | **ISR** (SSG + revalidate) | `pages/index.js` | `getStaticProps` + `revalidate: 60` — katalog di-generate saat build, lalu di-regenerate maksimal setiap 60 detik |
| `/promo`, `/faq` | **SSG** | `pages/promo.js`, `pages/faq.js` | `getStaticProps` — konten statis murni, di-generate sekali saat build |
| `/products/[id]` | **SSR** | `pages/products/[id].js` | `getServerSideProps` — data produk di-fetch di server **pada setiap request** |
| `/cart`, `/checkout`, `/login`, `/orders`, `/admin/*` | **CSR** | masing-masing di `pages/` | Tidak memakai `getStaticProps` / `getServerSideProps`; state & interaksi via React Context + `fetch` di browser |

### Mengapa pemisahan ini?

- **ISR (Home)** — daftar produk cepat di-load dari halaman statis, dengan pembaruan berkala tanpa fetch penuh di setiap kunjungan.
- **SSG (Promo & FAQ)** — konten marketing/informasi tidak berubah per user; cocok di-cache saat build.
- **SSR (Product detail)** — sesuai brief Module 4: **harga dan data produk selalu fresh** saat user membuka halaman. Data diambil dari [Escuela JS API](https://api.escuelajs.co) lewat `lib/fetch-product.js` (`cache: "no-store"`), bukan dari cache build statis.
- **CSR (Cart, auth, admin, dll.)** — halaman interaktif yang bergantung pada session user, cart di `localStorage`, atau form CRUD admin.

### Cara verifikasi saat demo / review

1. `npm run build` — pastikan build sukses; route `/`, `/promo`, `/faq` muncul sebagai static/ISR, `/products/[id]` sebagai SSR (`λ`).
2. Buka `/products/1` → refresh → harga/detail selalu di-render ulang di server (`getServerSideProps`).
3. Buka `/` → konten katalog dari ISR; perubahan katalog terbaru muncul setelah window revalidate (60 detik) atau rebuild.

---

# Authentication Flow

```
User login
   ↓
FakeStoreAPI validation
   ↓
Save token in cookie
   ↓
Middleware check cookie
   ↓
Allow / deny access to checkout
```

---

# Cart State Management

Menggunakan React Context:

```
CartContext
 ├ addToCart()
 ├ removeFromCart()
 ├ increaseQty()
 ├ decreaseQty()
 ├ clearCart()
 └ cartTotal
```

---

# Protected Route with Middleware

File:

```
middleware.js
```

Function:

- Check apakah cookie `token` ada
- Jika tidak ada → redirect ke `/login`
- Jika ada → allow access

Protected routes:

```
/checkout
```

---

# Installation & Setup

Clone repository:

```bash
git clone https://github.com/Revou-FSSE-Oct25/milestone-3-febrianrachmat.git
```

Masuk ke folder project:

```bash
cd milestone-3-febrianrachmat
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open browser:

```
http://localhost:3000
```

---

# FakeStoreAPI Login Credential

Gunakan:

```
Username: mor_2314
Password: 83r5^_
```

atau

```
Username: johnd
Password: m38rmF$
```

---

# Automated Tests

Jalankan unit test dengan Jest + React Testing Library:

```bash
npm test
```

Hasil saat ini: **15 test suites**, **64 tests** — semua pass.

Coverage utama:

| Area | File test |
|------|-----------|
| Home page & ISR | `__tests__/pages/index.test.js` |
| Cart & auth context | `context/__tests__/cartcontext.test.js`, `context/__tests__/authcontext.test.js` |
| Middleware (protected routes) | `middleware.test.js` |
| Checkout & order flow | `lib/__tests__/order-storage.test.js` — validasi form (`validateCheckoutForm`), simpan order, payload checkout |
| Product API & normalisasi | `lib/__tests__/fetch-product.test.js`, `lib/__tests__/normalize-api.test.js` |

Verifikasi build production:

```bash
npm run build
```

---

# Testing Flow

Test scenario yang bisa dilakukan:

### Authentication

- Login success
- Login fail
- Logout

### Cart

- Add item
- Increase quantity
- Decrease quantity
- Remove item
- Clear cart

### Protected Route

- Access checkout without login → redirect login
- Access checkout with login → allowed

---

# UI Preview

Features include:

- Modern navbar with profile avatar
- Cart badge indicator
- Product grid layout
- Clean checkout page
- Toast notification system

---

# Author

**Rachmat Febrian**

GitHub:
https://github.com/Revou-FSSE-Oct25/milestone-3-febrianrachmat

---
