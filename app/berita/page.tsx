'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './berita.module.css'

interface NewsItem {
    id: string
    title: string
    excerpt: string
    content: string
    image: string
    author: string
    date: string
    category: string
}

export default function BeritaPage() {
    const [news, setNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Data berita statis - akan diganti dengan API call
        setNews([
            {
                id: '1',
                title: 'Santri PPTQ Proto Raih Prestasi di MTQH XXI Provinsi Jawa Tengah',
                excerpt: 'Dua santri PPTQ Salafiyah Syafi\'iyah Proto berhasil menorehkan prestasi membanggakan dalam ajang MTQH XXI Tingkat Provinsi Jawa Tengah yang diselenggarakan di Kabupaten Tegal.',
                content: `Selamat dan sukses atas prestasi yang diraih oleh santri Pondok Pesantren Tahfidzul Qur'an Salafiyah Syafi'iyah Proto dalam ajang Musabaqah Tilawatil Qur'an dan Hafalan (MTQH) XXI Tingkat Provinsi Jawa Tengah di Kabupaten Tegal.

Perolehan Juara:
• Roqiful Ma'ani - Terbaik 2 Tilawah + Tahfidz 5 Juz
• M. Zidan Al Fahmi - Harapan 3 Tahfidz 30 Juz

Keberhasilan ini merupakan nikmat dari Allah SWT yang patut disyukuri. Semoga para juara semakin istiqamah dalam berjuang di jalan Al-Qur'an. Bagi teman-teman yang belum berhasil membawa pulang trofi, jangan berkecil hati—tetap semangat dan terus berprestasi!`,
                image: '/images/prestasi-santri-1.png',
                author: 'Admin PPTQ',
                date: '2025-12-28',
                category: 'Prestasi'
            },
            {
                id: '2',
                title: 'Peringatan Hari Santri Nasional 2025',
                excerpt: 'Yayasan Pendidikan Islam Salafiyah Syafi\'iyah Proto Kedungwuni turut serta dalam upacara Peringatan Hari Santri Nasional 2025.',
                content: `Yayasan Pendidikan Islam Salafiyah Syafi'iyah Proto Kedungwuni dengan bangga mengikuti upacara Peringatan Hari Santri Nasional 2025.

Dengan mengusung tema "Mengawal Indonesia Merdeka Menuju Peradaban Dunia", seluruh santri dan santriwati memperingati hari bersejarah ini dengan penuh khidmat.

Kami, dari santri untuk negeri. Semoga santri Indonesia senantiasa menjadi garda terdepan dalam menjaga keutuhan NKRI dan membawa peradaban Islam yang rahmatan lil 'alamin.`,
                image: '/images/hari-santri-1.webp',
                author: 'Admin PPTQ',
                date: '2025-10-22',
                category: 'Kegiatan'
            },
            {
                id: '3',
                title: 'Rangkaian Acara Rajaban 2026',
                excerpt: 'PPTQ Proto akan menggelar rangkaian acara Rajaban pada 8-9 Januari 2026, dimeriahkan dengan Haul Mbah Syarif hingga sunatan massal.',
                content: `Pondok Pesantren Tahfidzul Qur'an Salafiyah Syafi'iyah Proto akan menyelenggarakan rangkaian acara Rajaban pada tanggal 8-9 Januari 2026.

Rangkaian Acara:
• Haul Almaghfurlah Mbah KH. Syarif Da'un (Pendiri Pesantren)
• Pengajian Akbar
• Sunatan Massal
• Dan berbagai kegiatan lainnya

Seluruh masyarakat diundang untuk hadir dan memeriahkan acara ini. Mari bersama-sama mengenang jasa para pendiri pesantren dan mempererat tali silaturahmi.

Informasi lebih lanjut dapat menghubungi sekretariat pesantren.`,
                image: '/images/placeholder.jpg',
                author: 'Admin PPTQ',
                date: '2026-01-02',
                category: 'Pengumuman'
            },
        ])
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className="spinner"></div>
                <p>Memuat berita...</p>
            </div>
        )
    }

    return (
        <div className={styles.beritaPage}>
            {/* Header */}
            <section className={styles.header}>
                <div className="container text-center">
                    <h1>Berita & Pengumuman</h1>
                    <p>Informasi terkini seputar kegiatan pondok pesantren</p>
                </div>
            </section>

            {/* News Grid */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-3">
                        {news.map((item) => (
                            <article key={item.id} className={`card ${styles.newsCard}`}>
                                <div className={styles.newsImage}>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className={styles.newsImg}
                                    />
                                    <span className={styles.category}>{item.category}</span>
                                </div>
                                <div className={styles.newsContent}>
                                    <div className={styles.newsMeta}>
                                        <span>{new Date(item.date).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</span>
                                        <span>•</span>
                                        <span>{item.author}</span>
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.excerpt}</p>
                                    <a href={`/berita/${item.id}`} className="btn btn-outline">
                                        Baca Selengkapnya
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
