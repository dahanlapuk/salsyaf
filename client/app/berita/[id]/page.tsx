import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { newsData, getNewsById, getAllNewsIds } from '../data'
import ShareButtons from '@/components/ShareButtons'
import styles from './beritaDetail.module.css'

interface Props {
    params: Promise<{ id: string }>
}

export async function generateStaticParams() {
    return getAllNewsIds().map((id) => ({ id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const news = getNewsById(id)
    
    if (!news) {
        return { title: 'Berita Tidak Ditemukan' }
    }

    return {
        title: `${news.title} - PPTQ Salsyaf Proto`,
        description: news.excerpt,
    }
}

export default async function BeritaDetailPage({ params }: Props) {
    const { id } = await params
    const news = getNewsById(id)

    if (!news) {
        notFound()
    }

    // Get related news (exclude current)
    const relatedNews = newsData
        .filter(item => item.id !== id)
        .slice(0, 2)

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
                        <span>{new Date(news.date).toLocaleDateString('id-ID', {
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
                            src={news.image}
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
                                <Link key={item.id} href={`/berita/${item.id}`} className={styles.relatedCard}>
                                    <div className={styles.relatedImage}>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className={styles.relatedImg}
                                        />
                                    </div>
                                    <div className={styles.relatedContent}>
                                        <span className={styles.relatedCategory}>{item.category}</span>
                                        <h3>{item.title}</h3>
                                        <span className={styles.relatedDate}>
                                            {new Date(item.date).toLocaleDateString('id-ID', {
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
