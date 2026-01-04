import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
    return (
        <div className={styles.notFound}>
            {/* Decorative Background */}
            <div className={styles.bgPattern}></div>
            
            <div className={styles.container}>
                {/* Error Code */}
                <div className={styles.errorCode}>
                    <span className={styles.four}>4</span>
                    <span className={styles.zero}>
                        <span className={styles.quranIcon}>📖</span>
                    </span>
                    <span className={styles.four}>4</span>
                </div>

                <h1 className={styles.title}>Halaman Tidak Ditemukan</h1>
                <p className={styles.subtitle}>
                    Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                </p>

                {/* Quran Quote */}
                <div className={styles.quoteCard}>
                    <div className={styles.quoteIcon}>﷽</div>
                    <blockquote className={styles.arabicText}>
                        وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
                    </blockquote>
                    <p className={styles.translation}>
                        "Dan barangsiapa bertakwa kepada Allah, niscaya Dia akan membukakan jalan keluar baginya."
                    </p>
                    <cite className={styles.source}>— QS. Ath-Thalaq (65): 2</cite>
                </div>

                {/* Hadith Quote */}
                <div className={styles.hadithCard}>
                    <blockquote className={styles.hadithText}>
                        "Sesungguhnya Allah tidak melihat kepada bentuk rupa dan harta kalian, tetapi Dia melihat kepada hati dan amal perbuatan kalian."
                    </blockquote>
                    <cite className={styles.source}>— HR. Muslim</cite>
                </div>

                {/* Navigation Buttons */}
                <div className={styles.actions}>
                    <Link href="/" className={styles.primaryBtn}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                    <Link href="/kontak" className={styles.secondaryBtn}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        Hubungi Kami
                    </Link>
                </div>

                {/* Quick Links */}
                <div className={styles.quickLinks}>
                    <p>Atau kunjungi halaman lainnya:</p>
                    <div className={styles.links}>
                        <Link href="/profile">Profil</Link>
                        <Link href="/berita">Berita</Link>
                        <Link href="/jadwal">Jadwal</Link>
                        <Link href="/galeri">Galeri</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
