'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import ShareButtons from '@/components/ShareButtons'
import styles from './beritaDetail.module.css'

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

export default function BeritaDetailPage() {
    const params = useParams()
    const id = params.id as string
    const [news, setNews] = useState<NewsItem | null>(null)
    const [relatedNews, setRelatedNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        if (id) {
            fetchNewsDetail()
            fetchRelatedNews()
        }
    }, [id])

    const fetchNewsDetail = async () => {
        try {
            const res = await fetch(`${API_URL}/api/news/${id}`)
            if (res.ok) {
                const data = await res.json()
                setNews(data)
            } else {
                setNotFound(true)
            }
        } catch (error) {
            console.error('Error fetching news:', error)
            setNotFound(true)
        } finally {
            setLoading(false)
        }
    }

    const fetchRelatedNews = async () => {
        try {
            const res = await fetch(`${API_URL}/api/news`)
            if (res.ok) {
                const json = await res.json()
                const newsArray = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : [])
                const related = newsArray
                    .filter((item: NewsItem) => item._id !== id && item.published)
                    .slice(0, 2)
                setRelatedNews(related)
            }
        } catch (error) {
            console.error('Error fetching related news:', error)
        }
    }

    const getImageUrl = (image: string) => {
        if (image.startsWith('http')) return image
        if (image.startsWith('/images')) return image
        return `${API_URL}${image}`
    }

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className="spinner"></div>
                <p>Memuat berita...</p>
            </div>
        )
    }

    if (notFound || !news) {
        return (
            <div className={styles.notFound}>
                <h1>Berita Tidak Ditemukan</h1>
                <p>Berita yang Anda cari tidak tersedia.</p>
                <Link href="/berita" className="btn btn-primary">
                    Kembali ke Berita
                </Link>
            </div>
        )
    }

    return (
        <div className={styles.beritaDetailPage}>
            {/* Header */}
            <section className={styles.header}>
                <div className="container">
                    <Link href="/berita" className={styles.backLink}>
                        ← Kembali ke Berita
                    </Link>
                    <span className={styles.category}>{news.category}</span>
                    <h1>{news.title}</h1>
                    <div className={styles.meta}>
                        <span>{new Date(news.createdAt).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                        <span>•</span>
                        <span>{news.author}</span>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            <section className={styles.imageSection}>
                <div className="container">
                    <div className={styles.featuredImage}>
                        <Image
                            src={getImageUrl(news.image)}
                            alt={news.title}
                            fill
                            priority
                            className={styles.image}
                        />
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section">
                <div className="container">
                    <div className={styles.contentWrapper}>
                        <article className={styles.content}>
                            {news.content.split('\n\n').map((paragraph, index) => {
                                // Handle bold text with **text**
                                const formattedText = paragraph.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                        return <strong key={i}>{part.slice(2, -2)}</strong>
                                    }
                                    return part
                                })
                                
                                // Check if it's a list item
                                if (paragraph.startsWith('•') || paragraph.startsWith('-') || paragraph.startsWith('*')) {
                                    return <p key={index} className={styles.listItem}>{formattedText}</p>
                                }
                                
                                return <p key={index}>{formattedText}</p>
                            })}
                        </article>

                        {/* Share Section */}
                        <div className={styles.shareSection}>
                            <span>Bagikan:</span>
                            <ShareButtons title={news.title} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Related News */}
            {relatedNews.length > 0 && (
                <section className="section section-alt">
                    <div className="container">
                        <h2 className="text-center mb-lg">Berita Lainnya</h2>
                        <div className="grid grid-2">
                            {relatedNews.map((item) => (
                                <Link key={item._id} href={`/berita/${item._id}`} className={styles.relatedCard}>
                                    <div className={styles.relatedImage}>
                                        <Image
                                            src={getImageUrl(item.image)}
                                            alt={item.title}
                                            fill
                                            className={styles.relatedImg}
                                        />
                                    </div>
                                    <div className={styles.relatedContent}>
                                        <span className={styles.relatedCategory}>{item.category}</span>
                                        <h3>{item.title}</h3>
                                        <span className={styles.relatedDate}>
                                            {new Date(item.createdAt).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}
