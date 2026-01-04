# PPTQ Salafiyah Syafi'iyah Proto

Website resmi Pondok Pesantren Tahfidzul Quran Salafiyah Syafi'iyah Proto, Kedungwuni, Pekalongan.

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15 (App Router), TypeScript, CSS Modules |
| Backend | Express.js, MongoDB + Mongoose |
| Auth | JWT (JSON Web Token) |
| Deploy | Railway (Backend), Vercel (Frontend) |

## 📁 Project Structure

```
pptq-web/
├── client/                 # Frontend (Next.js)
│   ├── app/               # Pages & routes
│   │   ├── admin/         # Admin panel
│   │   ├── berita/        # News pages
│   │   ├── galeri/        # Gallery pages
│   │   ├── jadwal/        # Schedule pages
│   │   └── ...
│   ├── components/        # Reusable components
│   ├── public/            # Static assets
│   └── types/             # TypeScript declarations
│
└── server/                # Backend (Express + MongoDB)
    ├── src/
    │   ├── middleware/    # Auth & validation middleware
    │   ├── models/        # Mongoose schemas
    │   ├── routes/        # API endpoints
    │   └── scripts/       # Seed scripts
    └── uploads/           # Uploaded files
```

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Frontend (Client)

```bash
cd client
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend (Server)

```bash
cd server
npm install
cp .env.example .env
npm run seed:admin  # Create default admin
npm run dev
```

API runs on [http://localhost:5000](http://localhost:5000)

## 🔑 Environment Variables

### Client (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Server (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pptq-db
JWT_SECRET=your-secret-key  # WAJIB GANTI di production!
FRONTEND_URL=http://localhost:3000
```

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/news` | ❌ | Get all published news |
| GET | `/api/news/:id` | ❌ | Get single news |
| POST | `/api/news` | ✅ | Create news |
| PUT | `/api/news/:id` | ✅ | Update news |
| DELETE | `/api/news/:id` | ✅ | Delete news |
| GET | `/api/schedule` | ❌ | Get all schedules |
| GET | `/api/gallery` | ❌ | Get all gallery items |
| POST | `/api/auth/login` | ❌ | Admin login |
| POST | `/api/upload/image` | ✅ | Upload image |

## 🔒 Security Features

- ✅ JWT authentication dengan secret validation
- ✅ CORS whitelist configuration
- ✅ Input sanitization (XSS protection)
- ✅ MongoDB ObjectId validation
- ✅ Request body size limit (10MB)
- ✅ Protected admin registration endpoint

## 👤 Default Admin

```
Username: admin
Password: admin123
```

⚠️ **Segera ganti password setelah login pertama kali!**

## 📦 Version

**v1.4.12**

## 👨‍💻 Developer

[Hexadev Technologies](https://itbamuhammad01.web.app) © 2026
