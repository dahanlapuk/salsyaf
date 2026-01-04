import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// News Schema
const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String },
    author: { type: String, default: 'Admin' },
    category: { type: String, required: true },
    published: { type: Boolean, default: true }
}, { timestamps: true })

// Schedule Schema  
const ScheduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    time: { type: String, required: true },
    type: { type: String, required: true },
    day: { type: String }
}, { timestamps: true })

// Gallery Schema
const GallerySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    category: { type: String, required: true }
}, { timestamps: true })

const News = mongoose.model('News', NewsSchema)
const Schedule = mongoose.model('Schedule', ScheduleSchema)
const Gallery = mongoose.model('Gallery', GallerySchema)

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pptq-db'

// Data Berita
const newsData = [
    {
        title: 'Santri PPTQ Proto Raih Prestasi Membanggakan di MTQH XXI Provinsi Jawa Tengah',
        excerpt: 'Dua santri PPTQ Salafiyah Syafi\'iyah Proto berhasil menorehkan prestasi membanggakan dalam ajang MTQH XXI Tingkat Provinsi Jawa Tengah yang diselenggarakan di Kabupaten Tegal.',
        content: `Alhamdulillah, segala puji bagi Allah SWT yang telah memberikan nikmat dan karunia-Nya. Pondok Pesantren Tahfidzul Qur'an Salafiyah Syafi'iyah Proto kembali mengukir prestasi gemilang dalam ajang Musabaqah Tilawatil Qur'an dan Hafalan (MTQH) XXI Tingkat Provinsi Jawa Tengah yang diselenggarakan di Kabupaten Tegal.

Dalam kompetisi yang diikuti oleh ratusan peserta dari berbagai pesantren dan lembaga pendidikan Islam se-Jawa Tengah ini, dua santri kebanggaan PPTQ Proto berhasil meraih prestasi yang membanggakan:

**Perolehan Juara:**

1. Roqiful Ma'ani - Terbaik 2 Tilawah + Tahfidz 5 Juz
2. M. Zidan Al Fahmi - Harapan 3 Tahfidz 30 Juz

KH. Abdul Basith Syarif selaku Pengasuh Pondok Pesantren menyampaikan rasa syukur dan bangga atas prestasi yang diraih para santri. Semoga prestasi ini menjadi motivasi bagi seluruh santri untuk terus berjuang di jalan Al-Qur'an.`,
        image: '/images/prestasi-santri-1.png',
        author: 'Admin PPTQ',
        category: 'Prestasi',
        published: true
    },
    {
        title: 'Khidmat dan Semangat: PPTQ Proto Peringati Hari Santri Nasional 2025',
        excerpt: 'Yayasan Pendidikan Islam Salafiyah Syafi\'iyah Proto Kedungwuni turut serta dalam upacara Peringatan Hari Santri Nasional 2025 dengan penuh khidmat.',
        content: `Dalam rangka memperingati Hari Santri Nasional yang jatuh pada tanggal 22 Oktober 2025, Yayasan Pendidikan Islam Salafiyah Syafi'iyah Proto Kedungwuni menyelenggarakan upacara peringatan yang diikuti oleh seluruh santri putra dan putri, para asatidz, serta jajaran pengurus pesantren.

**Tema: "Mengawal Indonesia Merdeka Menuju Peradaban Dunia"**

Upacara dimulai pada pukul 07.00 WIB dengan pengibaran bendera Merah Putih dan bendera organisasi. Seluruh peserta upacara mengenakan seragam putih-putih sebagai simbol kesucian dan keikhlasan santri dalam menuntut ilmu.

Dalam sambutannya, KH. Abdul Basith Syarif menyampaikan pesan penting tentang peran santri dalam kehidupan berbangsa dan bernegara.

Dirgahayu Santri Indonesia! Dari santri untuk negeri, menuju peradaban dunia.`,
        image: '/images/hari-santri-1.webp',
        author: 'Admin PPTQ',
        category: 'Kegiatan',
        published: true
    },
    {
        title: 'Salsyaf Bersholawat: Majelis Sholawat Bersama Fata Qothrun Nada',
        excerpt: 'Hadirilah Salsyaf Bersholawat pada Rabu, 7 Januari 2026. Dimeriahkan Grup Fata Qothrun Nada, Ustadz Khurrul Fikri Wulida, dan Ustadz Fauzi (Asyiqol Musthofa).',
        content: `Pondok Pesantren Tahfidzul Qur'an Salafiyah Syafi'iyah Proto mengundang seluruh masyarakat untuk hadir dalam acara **Salsyaf Bersholawat**, majelis sholawat dan dzikir bersama yang akan diselenggarakan pada:

**Rabu, 7 Januari 2026 M / 7 Rajab 1447 H**
Pukul 18.30 WIB – Selesai
Halaman MISS Proto / Belakang Masjid Waqof

**Pengisi Acara:**
- Grup Fata Qothrun Nada
- Ustadz Khurrul Fikri Wulida
- Ustadz Fauzi (Asyiqol Musthofa)

**Rangkaian Acara:**
1. Khotmil Qur'an Bil Ghoib
2. Haul Akbar
3. Khitanan Massal
4. Wisuda TPQ Al-Ittihad

Live Streaming: YouTube ponpessalsyafproto`,
        image: '/images/placeholder.jpg',
        author: 'Admin PPTQ',
        category: 'Kegiatan',
        published: true
    }
]

// Data Jadwal
const scheduleData = [
    // Harian
    { title: 'Sholat Subuh Berjamaah', description: 'Sholat subuh berjamaah di masjid', time: '04:30', type: 'harian' },
    { title: 'Setoran Hafalan', description: 'Setoran hafalan kepada ustadz', time: '05:30 - 07:00', type: 'harian' },
    { title: 'Sarapan', description: 'Waktu sarapan santri', time: '07:00 - 07:30', type: 'harian' },
    { title: 'Kajian Kitab Kuning', description: 'Pembelajaran kitab kuning', time: '08:00 - 10:00', type: 'harian' },
    { title: 'Muraja\'ah', description: 'Muraja\'ah hafalan', time: '10:00 - 12:00', type: 'harian' },
    { title: 'Sholat Dzuhur & Makan Siang', description: '', time: '12:00 - 13:00', type: 'harian' },
    { title: 'Istirahat', description: 'Waktu istirahat siang', time: '13:00 - 14:30', type: 'harian' },
    { title: 'Sholat Ashar', description: 'Sholat ashar berjamaah', time: '15:30', type: 'harian' },
    { title: 'Setoran Hafalan Sore', description: 'Setoran hafalan sore', time: '16:00 - 17:30', type: 'harian' },
    { title: 'Sholat Maghrib', description: 'Sholat maghrib berjamaah', time: '18:00', type: 'harian' },
    { title: 'Makan Malam', description: 'Waktu makan malam', time: '18:30 - 19:00', type: 'harian' },
    { title: 'Sholat Isya', description: 'Sholat isya berjamaah', time: '19:30', type: 'harian' },
    { title: 'Kajian Malam', description: 'Kajian kitab atau tausiyah', time: '20:00 - 21:00', type: 'harian' },
    { title: 'Istirahat Malam', description: 'Waktu istirahat malam', time: '21:30', type: 'harian' },
    // Mingguan
    { title: 'Bersih-bersih Pondok', description: 'Kerja bakti membersihkan pondok', time: '08:00', type: 'mingguan', day: 'Jumat' },
    { title: 'Olahraga', description: 'Kegiatan olahraga bersama', time: '16:00', type: 'mingguan', day: 'Sabtu' },
    { title: 'Khataman Al-Qur\'an', description: 'Khataman Al-Qur\'an bersama', time: '08:00', type: 'mingguan', day: 'Ahad' },
    // Bulanan
    { title: 'Evaluasi Hafalan', description: 'Evaluasi hafalan bulanan', time: 'Minggu pertama', type: 'bulanan' },
    { title: 'Pertemuan Wali Santri', description: 'Pertemuan dengan wali santri', time: 'Minggu kedua', type: 'bulanan' },
]

// Data Galeri
const galleryData = [
    { title: 'Kegiatan Tahfidz', category: 'Kegiatan', image: '/images/placeholder.jpg', description: 'Santri sedang menghafal Al-Qur\'an' },
    { title: 'Gedung Utama', category: 'Fasilitas', image: '/images/placeholder.jpg', description: 'Gedung utama pondok pesantren' },
    { title: 'Wisuda Tahfidz', category: 'Kegiatan', image: '/images/placeholder.jpg', description: 'Wisuda tahfidz angkatan 2025' },
    { title: 'Asrama Santri Putra', category: 'Fasilitas', image: '/images/placeholder.jpg', description: 'Asrama santri putra' },
    { title: 'Kajian Kitab Kuning', category: 'Kegiatan', image: '/images/placeholder.jpg', description: 'Kajian kitab kuning bersama ustadz' },
    { title: 'Peringatan Maulid Nabi', category: 'Kegiatan', image: '/images/placeholder.jpg', description: 'Peringatan Maulid Nabi Muhammad SAW' },
    { title: 'Perpustakaan', category: 'Fasilitas', image: '/images/placeholder.jpg', description: 'Perpustakaan pondok pesantren' },
    { title: 'Olahraga Bersama', category: 'Kegiatan', image: '/images/placeholder.jpg', description: 'Kegiatan olahraga santri' },
    { title: 'Masjid Pondok', category: 'Fasilitas', image: '/images/placeholder.jpg', description: 'Masjid pondok pesantren' },
]

async function seedAllData() {
    try {
        console.log('🔄 Menghubungkan ke MongoDB...')
        await mongoose.connect(MONGODB_URI)
        console.log('✅ Terhubung ke MongoDB\n')

        // Seed News
        console.log('📰 Menyinkronkan Berita...')
        const existingNews = await News.countDocuments()
        if (existingNews === 0) {
            await News.insertMany(newsData)
            console.log(`   ✅ ${newsData.length} berita berhasil ditambahkan`)
        } else {
            console.log(`   ℹ️  Sudah ada ${existingNews} berita di database`)
        }

        // Seed Schedules
        console.log('\n📅 Menyinkronkan Jadwal...')
        const existingSchedules = await Schedule.countDocuments()
        if (existingSchedules === 0) {
            await Schedule.insertMany(scheduleData)
            console.log(`   ✅ ${scheduleData.length} jadwal berhasil ditambahkan`)
        } else {
            console.log(`   ℹ️  Sudah ada ${existingSchedules} jadwal di database`)
        }

        // Seed Gallery
        console.log('\n🖼️  Menyinkronkan Galeri...')
        const existingGallery = await Gallery.countDocuments()
        if (existingGallery === 0) {
            await Gallery.insertMany(galleryData)
            console.log(`   ✅ ${galleryData.length} foto berhasil ditambahkan`)
        } else {
            console.log(`   ℹ️  Sudah ada ${existingGallery} foto di database`)
        }

        console.log('\n' + '='.repeat(50))
        console.log('✅ Sinkronisasi data selesai!')
        console.log('='.repeat(50))

        await mongoose.disconnect()
        process.exit(0)
    } catch (error) {
        console.error('❌ Error:', error)
        process.exit(1)
    }
}

seedAllData()
