import mongoose from 'mongoose'
import dotenv from 'dotenv'

import News from '../models/News'
import Schedule from '../models/Schedule'
import Gallery from '../models/Gallery'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI tidak ditemukan di environment')
  process.exit(1)
}

/* =======================
   DATA BERITA
======================= */
const newsData = [
  {
    title: 'Santri PPTQ Proto Raih Prestasi Membanggakan di MTQH XXI Provinsi Jawa Tengah',
    excerpt:
      'Dua santri PPTQ Salafiyah Syafi’iyah Proto berhasil menorehkan prestasi membanggakan dalam ajang MTQH XXI Tingkat Provinsi Jawa Tengah.',
    content: `Alhamdulillah, segala puji bagi Allah SWT. Pondok Pesantren Tahfidzul Qur'an Salafiyah Syafi'iyah Proto kembali mengukir prestasi gemilang dalam ajang MTQH XXI Tingkat Provinsi Jawa Tengah.

**Perolehan Juara:**
1. Roqiful Ma'ani – Terbaik 2 Tilawah + Tahfidz 5 Juz
2. M. Zidan Al Fahmi – Harapan 3 Tahfidz 30 Juz

Semoga menjadi motivasi bagi seluruh santri.`,
    image: '/images/prestasi-santri-1.png',
    author: 'Admin PPTQ',
    category: 'Prestasi',
    published: true
  },
  {
    title: 'Khidmat dan Semangat: PPTQ Proto Peringati Hari Santri Nasional 2025',
    excerpt:
      'Yayasan Pendidikan Islam Salafiyah Syafi’iyah Proto memperingati Hari Santri Nasional 2025 dengan penuh khidmat.',
    content: `Upacara peringatan Hari Santri Nasional 2025 diikuti oleh seluruh santri, asatidz, dan pengurus pesantren.

Tema: **"Mengawal Indonesia Merdeka Menuju Peradaban Dunia"**.`,
    image: '/images/hari-santri-1.webp',
    author: 'Admin PPTQ',
    category: 'Kegiatan',
    published: true
  },
  {
    title: 'Salsyaf Bersholawat: Majelis Sholawat Bersama Fata Qothrun Nada',
    excerpt:
      'Hadirilah Salsyaf Bersholawat pada Rabu, 7 Januari 2026 bersama para habaib dan grup sholawat.',
    content: `Acara Salsyaf Bersholawat akan dilaksanakan pada:

**Rabu, 7 Januari 2026**
Pukul 18.30 WIB
Halaman MISS Proto / Belakang Masjid Waqof

Live streaming melalui YouTube resmi.`,
    image: '/images/placeholder.jpg',
    author: 'Admin PPTQ',
    category: 'Kegiatan',
    published: true
  }
]

/* =======================
   DATA JADWAL
======================= */
const scheduleData = [
  { title: 'Sholat Subuh Berjamaah', description: 'Sholat subuh berjamaah di masjid', time: '04:30', type: 'harian' },
  { title: 'Setoran Hafalan', description: 'Setoran hafalan kepada ustadz', time: '05:30 - 07:00', type: 'harian' },
  { title: 'Kajian Kitab Kuning', description: 'Pembelajaran kitab kuning', time: '08:00 - 10:00', type: 'harian' },
  { title: 'Sholat Dzuhur & Makan Siang', description: '', time: '12:00 - 13:00', type: 'harian' },
  { title: 'Sholat Maghrib', description: '', time: '18:00', type: 'harian' },
  { title: 'Kajian Malam', description: '', time: '20:00 - 21:00', type: 'harian' },

  { title: 'Bersih-bersih Pondok', description: '', time: '08:00', type: 'mingguan', day: 'Jumat' },
  { title: 'Olahraga', description: '', time: '16:00', type: 'mingguan', day: 'Sabtu' },
  { title: 'Khataman Al-Qur’an', description: '', time: '08:00', type: 'mingguan', day: 'Ahad' }
]

/* =======================
   DATA GALERI
======================= */
const galleryData = [
  { title: 'Kegiatan Tahfidz', category: 'Kegiatan', image: '/images/placeholder.jpg', description: 'Santri menghafal Al-Qur’an' },
  { title: 'Gedung Utama', category: 'Fasilitas', image: '/images/placeholder.jpg', description: 'Gedung utama pondok' },
  { title: 'Wisuda Tahfidz', category: 'Kegiatan', image: '/images/placeholder.jpg', description: 'Wisuda tahfidz 2025' },
  { title: 'Masjid Pondok', category: 'Fasilitas', image: '/images/placeholder.jpg', description: 'Masjid pondok pesantren' }
]

/* =======================
   SEED EXECUTION
======================= */
async function seedAllData() {
  try {
    console.log('🔄 Menghubungkan ke MongoDB...')
   await mongoose.connect(MONGODB_URI as string)
    console.log('✅ Terhubung ke MongoDB\n')

    // NEWS
    const newsCount = await News.countDocuments()
    if (newsCount === 0) {
      await News.insertMany(newsData)
      console.log(`📰 ${newsData.length} berita ditambahkan`)
    } else {
      console.log(`📰 Skip berita (sudah ada ${newsCount})`)
    }

    // SCHEDULE
    const scheduleCount = await Schedule.countDocuments()
    if (scheduleCount === 0) {
      await Schedule.insertMany(scheduleData)
      console.log(`📅 ${scheduleData.length} jadwal ditambahkan`)
    } else {
      console.log(`📅 Skip jadwal (sudah ada ${scheduleCount})`)
    }

    // GALLERY
    const galleryCount = await Gallery.countDocuments()
    if (galleryCount === 0) {
      await Gallery.insertMany(galleryData)
      console.log(`🖼️ ${galleryData.length} galeri ditambahkan`)
    } else {
      console.log(`🖼️ Skip galeri (sudah ada ${galleryCount})`)
    }

    console.log('\n✅ Seed data selesai dengan aman.')
    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed error:', error)
    process.exit(1)
  }
}

seedAllData()
