'use client'

import { useState, useEffect } from 'react'
import { Metadata } from 'next'
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
        // Simulate fetching news - will be replaced with actual API call
        setTimeout(() => {
            setNews([
                {
                    id: '1',
                    title: 'Wisuda Tahfidz Al-Qur\'an 30 Juz',
                    excerpt: 'Alhamdulillah, 15 santri berhasil menyelesaikan hafalan 30 juz Al-Qur\'an',
                    content: 'Lorem ipsum dolor sit amet...',
                    image: '/placeholder-news.jpg',
                    author: 'Admin',
                    date: '2025-12-20',
                    category: 'Prestasi'
                },
                {
                    id: '2',
                    title: 'Kegiatan Ramadhan 1446 H',
                    excerpt: 'Persiapan menyambut bulan suci Ramadhan dengan berbagai kegiatan',
                    content: 'Lorem ipsum dolor sit amet...',
                    image: '/placeholder-news.jpg',
                    author: 'Admin',
                    date: '2025-12-15',
                    category: 'Kegiatan'
                },
                {
                    id: '3',
                    title: 'Pendaftaran Santri Baru Dibuka',
                    excerpt: 'Pendaftaran santri baru tahun ajaran 2025/2026 telah dibuka',
                    content: 'Lorem ipsum dolor sit amet...',
                    image: '/placeholder-news.jpg',
                    author: 'Admin',
                    date: '2025-12-10',
                    category: 'Pengumuman'
                },
            ])
            setLoading(false)
        }, 500)
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
                                    <div className={styles.imagePlaceholder}>📰</div>
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
