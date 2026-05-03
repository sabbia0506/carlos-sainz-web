# TUTAM SBD10 — Carlos Sainz Fans Page + Shop
**Sabbia Meilandri Putri Delarosya — 2406351131**

## Struktur Folder
```
TUTAM_ES_SabbiaMeilandriPutriDelarosya_2406351131_SB10/
├── frontend/          ← React + Vite (deploy ke Vercel)
│   ├── src/
│   │   ├── App.jsx    ← SEMUA komponen ada di sini
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
└── backend/           ← Express.js + MongoDB (deploy ke Render)
    ├── server.js
    ├── package.json
    └── .env.example
```

---

## Setup Lokal

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env: isi MONGODB_URI dengan URI MongoDB Atlas kamu
npm run dev
# Backend jalan di http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend jalan di http://localhost:5173
```
> Vite otomatis proxy `/api` ke `http://localhost:5000` saat development lokal.

---

## Deploy

### Backend → Render (gratis)
1. Buat akun di [render.com](https://render.com)
2. New → Web Service → connect GitHub repo
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Tambah Environment Variables:
   - `MONGODB_URI` = URI Atlas kamu
   - `JWT_SECRET` = random string panjang
   - `FRONTEND_URL` = URL Vercel kamu (setelah deploy frontend)
7. Deploy → copy URL backend (e.g. `https://sainz-backend.onrender.com`)

### Frontend → Vercel
1. Buka [vercel.com](https://vercel.com)
2. Import GitHub repo
3. Root directory: `frontend`
4. Tambah Environment Variable:
   - `VITE_API_URL` = `https://sainz-backend.onrender.com/api`
5. Deploy!

---

## Fitur
- ✅ Fans Page: Hero Carousel, Gallery dengan Like System, Appreciation Dashboard
- ✅ Shop: Katalog produk Carlos Sainz merchandise
- ✅ Auth: Register & Login dengan JWT
- ✅ Cart: Tambah, update qty, hapus, checkout
- ✅ Protected Routes: Cart & checkout hanya untuk user login
- ✅ CRUD Orders: Create, Read, Delete via API
- ✅ Responsive design
- ✅ 3D hover effects pada product cards

## Tech Stack
- **Frontend**: React 18, React Router v6, Vite
- **Backend**: Express.js, MongoDB (Mongoose), JWT, bcryptjs
- **Deploy**: Vercel (frontend) + Render (backend) + MongoDB Atlas
