import Image from 'next/image'
import styles from './Hero.module.css'

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <div className={styles.logoContainer}>
                    <Image
                        src="/images/placeholder.jpg"
                        alt="Logo PPTQ Salafiyah Syafi'iyah"
                        width={150}
                        height={150}
                        className={styles.logo}
                        priority
                    />
                </div>
                <h1 className={styles.title}>
                    Pondok Pesantren Tahfidzul Quran
                    <br />
                    <span className={styles.subtitle}>Proto</span>
                </h1>
                <p className={styles.description}>
                    Membentuk Generasi Qur'ani yang Berakhlak Mulia
                </p>
                <div className={styles.location}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Jl. Ponpes Al-quran Gang 2, Proto Karangasem, Kedungwuni, Pekalongan 51173
                </div>
                <div className={styles.buttons}>
                    <a href="/profile" className="btn btn-primary">Tentang Kami</a>
                    <a href="/kontak" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Hubungi Kami</a>
                </div>
            </div>
            <div className={styles.wave}>
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="white"></path>
                </svg>
            </div>
        </section>
    )
}
