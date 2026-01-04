'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './berita.module.css'

interface NewsItem {
    _id: string
    title: string
    excerpt: string
    content: string
    image: string
    category: string
    author: string
    createdAt: string
    published: boolean
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function BeritaPage() {
    const [newsData, setNewsData] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchNews()
    }, [])

    const fetchNews = async () => {
        try {
            const res = await fetch(`${API_URL}/api/news`)
            if (res.ok) {
                const json = await res.json()
                console.log('DEBUG DATA:', json)
                console.log('DEBUG DATA.TYPE:', typeof json?.data, Array.isArray(json?.data))
                const newsArray = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : [])
                setNewsData(newsArray.filter((n: NewsItem) => n.published))
            }
        } catch (error) {
            console.error('Error fetching news:', error)
        } finally {
            setLoading(false)
        }
    }

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
                        {newsData.map((item) => (
                            <article key={item._id} className={`card ${styles.newsCard}`}>
                                <div className={styles.newsImage}>
                                    <Image
                                        src={item.image.startsWith('http') ? item.image : (item.image.startsWith('/images') ? item.image : `${API_URL}${item.image}`)}
                                        alt={item.title}
                                        fill
                                        className={styles.newsImg}
                                    />
                                    <span className={styles.category}>{item.category}</span>
                                </div>
                                <div className={styles.newsContent}>
                                    <div className={styles.newsMeta}>
                                        <span>{new Date(item.createdAt).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</span>
                                        <span>•</span>
                                        <span>{item.author}</span>
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.excerpt}</p>
                                    <Link href={`/berita/${item._id}`} className="btn btn-outline">
                                        Baca Selengkapnya
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
