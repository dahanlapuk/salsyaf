'use client'

import { useState, useEffect } from 'react'
import styles from './galeri.module.css'
import Image from 'next/image'

interface GalleryItem {
    _id: string
    title: string
    description?: string
    category: string
    image: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function GaleriPage() {
    const [gallery, setGallery] = useState<GalleryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('all')

    useEffect(() => {
        fetchGallery()
    }, [])

    const fetchGallery = async () => {
        try {
            const res = await fetch(`${API_URL}/api/gallery`)
            if (res.ok) {
                const json = await res.json()
                // Backend returns { success, data, pagination }
                const galleryArray = Array.isArray(json.data) ? json.data : []
                setGallery(galleryArray)
            }
        } catch (error) {
            console.error('Error fetching gallery:', error)
        } finally {
            setLoading(false)
        }
    }

    const categories = [
        { value: 'all', label: 'Semua' },
        { value: 'Kegiatan', label: 'Kegiatan' },
        { value: 'Fasilitas', label: 'Fasilitas' },
        { value: 'Prestasi', label: 'Prestasi' },
        { value: 'Santri', label: 'Santri' },
    ]

    const filteredGallery = selectedCategory === 'all'
        ? gallery
        : gallery.filter(item => item.category === selectedCategory)

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className="spinner"></div>
                <p>Memuat galeri...</p>
            </div>
        )
    }

    return (
        <div className={styles.galeriPage}>
            {/* Header */}
            <section className={styles.header}>
                <div className="container text-center">
                    <h1>Galeri Foto</h1>
                    <p>Dokumentasi kegiatan dan fasilitas pondok pesantren</p>
                </div>
            </section>

            {/* Gallery Content */}
            <section className="section">
                <div className="container">
                    {/* Category Filter */}
                    <div className={styles.filters}>
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                className={`${styles.filterBtn} ${selectedCategory === cat.value ? styles.active : ''}`}
                                onClick={() => setSelectedCategory(cat.value)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    <div className={styles.galleryGrid}>
                        {filteredGallery.map((item) => (
                            <div key={item._id} className={styles.galleryItem}>
                                <div className={styles.imagePlaceholder}>
                                    {item.image && item.image !== '/images/placeholder.jpg' ? (
                                        <Image
                                            src={item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`}
                                            alt={item.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div className={styles.imageIcon}>🖼️</div>
                                    )}
                                </div>
                                <div className={styles.galleryOverlay}>
                                    <h4>{item.title}</h4>
                                    <span className={styles.categoryBadge}>{item.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
