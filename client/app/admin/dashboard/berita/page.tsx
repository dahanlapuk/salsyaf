'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../admin.module.css'

interface News {
    _id: string
    title: string
    excerpt: string
    category: string
    published: boolean
    createdAt: string
    image?: string
}

export default function BeritaPage() {
    const [news, setNews] = useState<News[]>([])
    const [loading, setLoading] = useState(true)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [message, setMessage] = useState({ type: '', text: '' })

    useEffect(() => {
        fetchNews()
    }, [])

    const fetchNews = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news?limit=100`)
            const json = await res.json()
            const newsArray = Array.isArray(json.data) ? json.data : []
            setNews(newsArray)
        } catch (error) {
            console.error('Error fetching news:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!deleteId) return

        try {
            const token = localStorage.getItem('adminToken')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${deleteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json()
            if (data.success) {
                setNews(news.filter(n => n._id !== deleteId))
                setMessage({ type: 'success', text: 'Berita berhasil dihapus' })
            } else {
                setMessage({ type: 'error', text: data.message || 'Gagal menghapus berita' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Terjadi kesalahan' })
        } finally {
            setDeleteId(null)
            setTimeout(() => setMessage({ type: '', text: '' }), 3000)
        }
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    return (
        <>
            {message.text && (
                <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                    {message.text}
                </div>
            )}

            <div className={styles.dataSection}>
                <div className={styles.dataSectionHeader}>
                    <h2>Daftar Berita</h2>
                    <Link href="/admin/dashboard/berita/tambah" className={styles.addButton}>
                        ➕ Tambah Berita
                    </Link>
                </div>

                {loading ? (
                    <div className={styles.loading}>Memuat data...</div>
                ) : news.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>Belum ada berita</p>
                    </div>
                ) : (
                    <table className={styles.dataTable}>
                        <thead>
                            <tr>
                                <th>Gambar</th>
                                <th>Judul</th>
                                <th>Kategori</th>
                                <th>Tanggal</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} />
                                        ) : (
                                            <div style={{ width: 50, height: 50, background: '#eee', borderRadius: 6 }} />
                                        )}
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.category}</td>
                                    <td>{formatDate(item.createdAt)}</td>
                                    <td>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            background: item.published ? '#e8f5e9' : '#ffebee',
                                            color: item.published ? '#2e7d32' : '#c62828'
                                        }}>
                                            {item.published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/admin/dashboard/berita/edit/${item._id}`} className={styles.editBtn}>
                                                ✏️ Edit
                                            </Link>
                                            <button 
                                                className={styles.deleteBtn}
                                                onClick={() => setDeleteId(item._id)}
                                            >
                                                🗑️ Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>Konfirmasi Hapus</h3>
                        <p>Apakah Anda yakin ingin menghapus berita ini?</p>
                        <div className={styles.modalActions}>
                            <button className={styles.cancelBtn} onClick={() => setDeleteId(null)}>
                                Batal
                            </button>
                            <button className={styles.deleteBtn} onClick={handleDelete}>
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
