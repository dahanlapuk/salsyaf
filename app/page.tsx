'use client'

import Hero from '@/components/Hero'
import YouTubePopup from '@/components/YouTubePopup'
import styles from './page.module.css'

export default function Home() {
    return (
        <div className={styles.home}>
            <YouTubePopup videoId="-CAL3YpejUM" autoClose={2} />
            <Hero />

            {/* Welcome Section */}
            <section className="section">
                <div className="container text-center">
                    <h2 className="animate-fade-in mb-md">
                        Selamat Datang di Pondok Pesantren Tahfidzul Quran
                    </h2>
                    <p className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.125rem' }}>
                        Pondok Pesantren Tahfidzul Quran Salafiyah Syafi'iyah adalah lembaga pendidikan Islam
                        yang berfokus pada hafalan Al-Qur'an dengan pendekatan salafiyah dan syafi'iyah.
                        Kami berkomitmen untuk mencetak generasi Qur'ani yang berakhlak mulia.
                    </p>
                </div>
            </section>

            {/* Quick Info Cards */}
            <section className="section section-alt">
                <div className="container">
                    <div className="grid grid-3">
                        <div className="card card-glass text-center animate-fade-in">
                            <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)' }}>📖</div>
                            <h3>Tahfidz Al-Qur'an</h3>
                            <p>Program hafalan Al-Qur'an dengan metode yang terbukti efektif dan menyenangkan</p>
                        </div>

                        <div className="card card-glass text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)' }}>🕌</div>
                            <h3>Pendidikan Salafiyah</h3>
                            <p>Pembelajaran kitab kuning dan ilmu agama dengan manhaj salafiyah syafi'iyah</p>
                        </div>

                        <div className="card card-glass text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)' }}>👥</div>
                            <h3>Pembinaan Akhlak</h3>
                            <p>Pembentukan karakter Islami melalui pembiasaan dan keteladanan</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section">
                <div className="container text-center">
                    <h2 className="mb-md">Bergabunglah Bersama Kami</h2>
                    <p className="mb-lg" style={{ fontSize: '1.125rem', color: 'var(--color-text-light)' }}>
                        Mari bersama-sama menghafal Al-Qur'an dan mendalami ilmu agama
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/profile" className="btn btn-primary">Tentang Kami</a>
                        <a href="/berita" className="btn btn-secondary">Berita Terbaru</a>
                        <a href="/galeri" className="btn btn-outline">Lihat Galeri</a>
                    </div>
                </div>
            </section>
        </div>
    )
}
