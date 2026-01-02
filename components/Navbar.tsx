'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Navbar.module.css'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/images/placeholder.jpg"
                        alt="Logo PPTQ"
                        width={50}
                        height={50}
                        className={styles.logoImage}
                    />
                    <span className={styles.logoText}>PPTQ Salsyaf Proto</span>
                </Link>

                <button
                    className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
                    <li><Link href="/" onClick={() => setIsOpen(false)}>Beranda</Link></li>
                    <li><Link href="/profile" onClick={() => setIsOpen(false)}>Profil</Link></li>
                    <li><Link href="/berita" onClick={() => setIsOpen(false)}>Berita</Link></li>
                    <li><Link href="/jadwal" onClick={() => setIsOpen(false)}>Jadwal</Link></li>
                    <li><Link href="/galeri" onClick={() => setIsOpen(false)}>Galeri</Link></li>
                    <li><Link href="/kontak" onClick={() => setIsOpen(false)}>Kontak</Link></li>
                </ul>
            </div>
        </nav>
    )
}
