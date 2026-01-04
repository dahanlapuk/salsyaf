'use client'

import { useState, useEffect } from 'react'
import styles from './galeri.module.css'

interface GalleryItem {
    id: string
    title: string
    category: string
    image: string
}

export default function GaleriPage() {
    const [gallery, setGallery] = useState<GalleryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('all')

    useEffect(() => {
        // Simulate fetching gallery
        setTimeout(() => {
            setGallery([
                { id: '1', title: 'Kegiatan Tahfidz', category: 'kegiatan', image: '/placeholder.jpg' },
                { id: '2', title: 'Gedung Utama', category: 'fasilitas', image: '/placeholder.jpg' },
                { id: '3', title: 'Wisuda Tahfidz', category: 'acara', image: '/placeholder.jpg' },
                { id: '4', title: 'Asrama Santri', category: 'fasilitas', image: '/placeholder.jpg' },
                { id: '5', title: 'Kajian Kitab', category: 'kegiatan', image: '/placeholder.jpg' },
                { id: '6', title: 'Peringatan Maulid', category: 'acara', image: '/placeholder.jpg' },
                { id: '7', title: 'Perpustakaan', category: 'fasilitas', image: '/placeholder.jpg' },
                { id: '8', title: 'Olahraga Bersama', category: 'kegiatan', image: '/placeholder.jpg' },
                { id: '9', title: 'Masjid Pondok', category: 'fasilitas', image: '/placeholder.jpg' },
            ])
            setLoading(false)
        }, 500)
    }, [])

    const categories = [
        { value: 'all', label: 'Semua' },
        { value: 'kegiatan', label: 'Kegiatan' },
        { value: 'fasilitas', label: 'Fasilitas' },
        { value: 'acara', label: 'Acara' },
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
                            <div key={item.id} className={styles.galleryItem}>
                                <div className={styles.imagePlaceholder}>
                                    <div className={styles.imageIcon}>🖼️</div>
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
