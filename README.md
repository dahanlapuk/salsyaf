# Pondok Pesantren Tahfidzul Quran - Website

Website company profile untuk Pondok Pesantren Tahfidzul Quran Salafiyah Syafi'iyah yang berlokasi di Pekalongan.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Vanilla CSS with Islamic-inspired design
- **Features**: 
  - Responsive design
  - Server-side rendering
  - Optimized images
  - Modern animations

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Features**:
  - RESTful API
  - Admin authentication
  - CRUD operations for news, schedules, and gallery

## 📋 Features

- ✅ **Homepage** dengan hero section yang menarik
- ✅ **Profil** pondok pesantren dengan visi, misi, dan program
- ✅ **Berita** dengan sistem kategori dan pagination
- ✅ **Jadwal** kegiatan harian, mingguan, dan bulanan
- ✅ **Galeri** foto dengan filter kategori
- ✅ **Kontak** dengan form dan informasi lengkap
- ✅ **Backend API** untuk manajemen konten
- ✅ **Admin Authentication** dengan JWT

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- MongoDB (local atau cloud)
- npm atau yarn

### Frontend Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local and set your API URL
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Run development server
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env and configure:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/pptq-db
# JWT_SECRET=your-secret-key-here

# Run development server
npm run dev
```

Backend akan berjalan di `http://localhost:5000`

## 📁 Project Structure

```
pptq-web/
├── app/                    # Next.js app directory
│   ├── berita/            # News page
│   ├── galeri/            # Gallery page
│   ├── jadwal/            # Schedule page
│   ├── kontak/            # Contact page
│   ├── profile/           # Profile page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── Navbar.tsx
├── public/                # Static files
│   └── profil.jpg        # Logo
├── server/                # Backend server
│   └── src/
│       ├── models/       # MongoDB models
│       ├── routes/       # API routes
│       └── index.ts      # Server entry point
└── README.md
```

## 🔌 API Endpoints

### News
- `GET /api/news` - Get all news (with pagination)
- `GET /api/news/:id` - Get single news
- `POST /api/news` - Create news (admin)
- `PUT /api/news/:id` - Update news (admin)
- `DELETE /api/news/:id` - Delete news (admin)

### Schedule
- `GET /api/schedule` - Get all schedules
- `GET /api/schedule/:id` - Get single schedule
- `POST /api/schedule` - Create schedule (admin)
- `PUT /api/schedule/:id` - Update schedule (admin)
- `DELETE /api/schedule/:id` - Delete schedule (admin)

### Gallery
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get single item
- `POST /api/gallery` - Create item (admin)
- `DELETE /api/gallery/:id` - Delete item (admin)

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register admin
- `GET /api/auth/verify` - Verify token

## 🎨 Design Features

- Islamic-inspired color scheme (emerald green & gold)
- Glassmorphism effects
- Smooth animations and transitions
- Responsive design for all devices
- Modern typography with Google Fonts
- Accessible and SEO-friendly

## 📝 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pptq-db
JWT_SECRET=your-secret-key-change-this-in-production
```

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project to Vercel
3. Set environment variables
4. Deploy

### Backend (Railway/Render/DigitalOcean)
1. Set up MongoDB Atlas or use local MongoDB
2. Configure environment variables
3. Deploy backend server
4. Update frontend API URL

## 📧 Contact

Pondok Pesantren Tahfidzul Quran Salafiyah Syafi'iyah
- **Alamat**: Jl. Ponpes Al-quran Gang 2, Proto Karangasem, Kedungwuni, Pekalongan 51173
- **Email**: ponpes_salsyaf@example.com
- **Instagram**: @ponpes_salsyaf

## 📄 License

© 2025 Pondok Pesantren Tahfidzul Quran Salafiyah Syafi'iyah. All rights reserved.
