import Image from 'next/image'
import styles from './Hero.module.css'

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <div className={styles.logoContainer}>
                    <Image
                        src="/profil.jpg"
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
                    <span className={styles.subtitle}>Salafiyah Syafi'iyah</span>
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
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="white"></path>
                </svg>
            </div>
        </section>
    )
}
