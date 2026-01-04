'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../admin.module.css'

interface Stats {
    news: number
    gallery: number
    schedule: number
}

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats>({ news: 0, gallery: 0, schedule: 0 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL

            const [newsRes, galleryRes, scheduleRes] = await Promise.all([
                fetch(`${apiUrl}/api/news?admin=true`).catch(() => null),
                fetch(`${apiUrl}/api/gallery?admin=true`).catch(() => null),
                fetch(`${apiUrl}/api/schedule`).catch(() => null)
            ])

            const newsData = newsRes ? await newsRes.json() : { data: [], pagination: { total: 0 } }
            const galleryData = galleryRes ? await galleryRes.json() : { data: [], pagination: { total: 0 } }
            const scheduleData = scheduleRes ? await scheduleRes.json() : { data: [] }

            const newsArray = Array.isArray(newsData.data) ? newsData.data : []
            const galleryArray = Array.isArray(galleryData.data) ? galleryData.data : []
            const scheduleArray = Array.isArray(scheduleData.data) ? scheduleData.data : []

            setStats({
                news: newsData.pagination?.total || newsArray.length,
                gallery: galleryData.pagination?.total || galleryArray.length,
                schedule: scheduleArray.length
            })
        } catch (error) {
            console.error('Error fetching stats:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.news}`}>📰</div>
                    <div className={styles.statInfo}>
                        <h3>{loading ? '...' : stats.news}</h3>
                        <p>Total Berita</p>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.gallery}`}>🖼️</div>
                    <div className={styles.statInfo}>
                        <h3>{loading ? '...' : stats.gallery}</h3>
                        <p>Foto Galeri</p>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.schedule}`}>📅</div>
                    <div className={styles.statInfo}>
                        <h3>{loading ? '...' : stats.schedule}</h3>
                        <p>Jadwal Kegiatan</p>
                    </div>
                </div>
            </div>

            <div className={styles.dataSection}>
                <div className={styles.dataSectionHeader}>
                    <h2>Aksi Cepat</h2>
                </div>
                <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                    <Link href="/admin/dashboard/berita/tambah" className={styles.addButton} style={{ justifyContent: 'center', padding: '1rem' }}>
                        ✏️ Tulis Berita
                    </Link>
                    <Link href="/admin/dashboard/jadwal/tambah" className={styles.addButton} style={{ justifyContent: 'center', padding: '1rem' }}>
                        📅 Tambah Jadwal
                    </Link>
                    <Link href="/admin/dashboard/galeri/tambah" className={styles.addButton} style={{ justifyContent: 'center', padding: '1rem' }}>
                        🖼️ Upload Foto
                    </Link>
                </div>
            </div>
        </>
    )
}
