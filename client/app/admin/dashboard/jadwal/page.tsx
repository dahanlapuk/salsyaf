'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../admin.module.css'

interface Schedule {
    _id: string
    title: string
    time: string
    type: string
    day?: string
    description?: string
}

export default function JadwalPage() {
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [loading, setLoading] = useState(true)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [message, setMessage] = useState({ type: '', text: '' })

    useEffect(() => {
        fetchSchedules()
    }, [])

    const fetchSchedules = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedule`)
            const json = await res.json()
            const schedulesArray = Array.isArray(json.data) ? json.data : []
            setSchedules(schedulesArray)
        } catch (error) {
            console.error('Error fetching schedules:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!deleteId) return

        try {
            const token = localStorage.getItem('adminToken')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedule/${deleteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json()
            if (data.success) {
                setSchedules(schedules.filter(s => s._id !== deleteId))
                setMessage({ type: 'success', text: 'Jadwal berhasil dihapus' })
            } else {
                setMessage({ type: 'error', text: data.message || 'Gagal menghapus jadwal' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Terjadi kesalahan' })
        } finally {
            setDeleteId(null)
            setTimeout(() => setMessage({ type: '', text: '' }), 3000)
        }
    }

    const getTypeLabel = (type: string) => {
        const types: Record<string, string> = {
            'harian': 'Harian',
            'mingguan': 'Mingguan',
            'bulanan': 'Bulanan',
            'tahunan': 'Tahunan'
        }
        return types[type] || type
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
                    <h2>Daftar Jadwal</h2>
                    <Link href="/admin/dashboard/jadwal/tambah" className={styles.addButton}>
                        ➕ Tambah Jadwal
                    </Link>
                </div>

                {loading ? (
                    <div className={styles.loading}>Memuat data...</div>
                ) : schedules.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>Belum ada jadwal</p>
                    </div>
                ) : (
                    <table className={styles.dataTable}>
                        <thead>
                            <tr>
                                <th>Kegiatan</th>
                                <th>Waktu</th>
                                <th>Hari</th>
                                <th>Tipe</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.title}</td>
                                    <td>{item.time}</td>
                                    <td>{item.day || '-'}</td>
                                    <td>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            background: '#e3f2fd',
                                            color: '#1565c0'
                                        }}>
                                            {getTypeLabel(item.type)}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/admin/dashboard/jadwal/edit/${item._id}`} className={styles.editBtn}>
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

            {deleteId && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>Konfirmasi Hapus</h3>
                        <p>Apakah Anda yakin ingin menghapus jadwal ini?</p>
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
