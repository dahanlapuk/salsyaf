'use client'

import Image from 'next/image'
import Link from 'next/link'
import { newsData } from './data'
import styles from './berita.module.css'

export default function BeritaPage() {
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
                                    <Link href={`/berita/${item.id}`} className="btn btn-outline">
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
