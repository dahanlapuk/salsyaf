'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from '../admin.module.css'

interface AdminUser {
    id: string
    username: string
    role: string
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<AdminUser | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        const userData = localStorage.getItem('adminUser')

        if (!token || !userData) {
            router.push('/admin')
            return
        }

        try {
            setUser(JSON.parse(userData))
        } catch {
            router.push('/admin')
            return
        }

        setLoading(false)
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        router.push('/admin')
    }

    if (loading) {
        return (
            <div className={styles.loading}>
                <p>Memuat...</p>
            </div>
        )
    }

    const isActive = (path: string) => pathname === path ? styles.active : ''

    const getPageTitle = () => {
        if (pathname === '/admin/dashboard') return 'Dashboard'
        if (pathname === '/admin/dashboard/berita') return 'Kelola Berita'
        if (pathname === '/admin/dashboard/jadwal') return 'Kelola Jadwal'
        if (pathname === '/admin/dashboard/galeri') return 'Kelola Galeri'
        if (pathname?.includes('/tambah')) return 'Tambah Data'
        if (pathname?.includes('/edit')) return 'Edit Data'
        return 'Dashboard'
    }

    return (
        <div className={styles.adminLayout}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2>🕌 Admin PPTQ</h2>
                    <p>Salsyaf Proto</p>
                </div>
                <ul className={styles.sidebarNav}>
                    <li>
                        <Link href="/admin/dashboard" className={isActive('/admin/dashboard')}>
                            📊 Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/dashboard/berita" className={isActive('/admin/dashboard/berita')}>
                            📰 Berita
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/dashboard/jadwal" className={isActive('/admin/dashboard/jadwal')}>
                            📅 Jadwal
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/dashboard/galeri" className={isActive('/admin/dashboard/galeri')}>
                            🖼️ Galeri
                        </Link>
                    </li>
                    <li>
                        <Link href="/" target="_blank">
                            🌐 Lihat Website
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleLogout}>
                            🚪 Logout
                        </button>
                    </li>
                </ul>
            </aside>

            <main className={styles.mainContent}>
                <header className={styles.topBar}>
                    <h1>{getPageTitle()}</h1>
                    <div className={styles.userInfo}>
                        <div className={styles.userAvatar}>
                            {user?.username.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 500, color: '#374151' }}>{user?.username}</span>
                    </div>
                </header>
                <div className={styles.contentArea}>
                    {children}
                </div>
            </main>
        </div>
    )
}
