'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../admin.module.css'

interface Gallery {
    _id: string
    title: string
    image: string
    category: string
    createdAt: string
}

export default function GaleriPage() {
    const [gallery, setGallery] = useState<Gallery[]>([])
    const [loading, setLoading] = useState(true)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [message, setMessage] = useState({ type: '', text: '' })

    useEffect(() => {
        fetchGallery()
    }, [])

    const fetchGallery = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery?limit=100&admin=true`)
            const data = await res.json()
            if (data.success) {
                setGallery(data.data)
            }
        } catch (error) {
            console.error('Error fetching gallery:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!deleteId) return

        try {
            const token = localStorage.getItem('adminToken')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${deleteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json()
            if (data.success) {
                setGallery(gallery.filter(g => g._id !== deleteId))
                setMessage({ type: 'success', text: 'Foto berhasil dihapus' })
            } else {
                setMessage({ type: 'error', text: data.message || 'Gagal menghapus foto' })
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
                    <h2>Daftar Galeri</h2>
                    <Link href="/admin/dashboard/galeri/tambah" className={styles.addButton}>
                        ➕ Tambah Foto
                    </Link>
                </div>

                {loading ? (
                    <div className={styles.loading}>Memuat data...</div>
                ) : gallery.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>Belum ada foto di galeri</p>
                    </div>
                ) : (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                        gap: '1.5rem',
                        padding: '1.5rem'
                    }}>
                        {gallery.map((item) => (
                            <div key={item._id} style={{
                                background: 'white',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}>
                                <div style={{ 
                                    height: '180px', 
                                    background: '#f0f0f0',
                                    overflow: 'hidden'
                                }}>
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: 'cover' 
                                        }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/images/placeholder.jpg'
                                        }}
                                    />
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>{item.title}</h4>
                                    <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
                                        {item.category}
                                    </p>
                                    <p style={{ fontSize: '0.8rem', color: '#999', marginBottom: '1rem' }}>
                                        {formatDate(item.createdAt)}
                                    </p>
                                    <div className={styles.actions} style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Link 
                                            href={`/admin/dashboard/galeri/edit/${item._id}`}
                                            className={styles.editBtn}
                                            style={{ flex: 1, textAlign: 'center' }}
                                        >
                                            ✏️ Edit
                                        </Link>
                                        <button 
                                            className={styles.deleteBtn}
                                            onClick={() => setDeleteId(item._id)}
                                            style={{ flex: 1 }}
                                        >
                                            🗑️ Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {deleteId && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>Konfirmasi Hapus</h3>
                        <p>Apakah Anda yakin ingin menghapus foto ini?</p>
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
