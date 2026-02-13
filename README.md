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
