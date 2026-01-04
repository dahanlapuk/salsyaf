'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import styles from '../../../../admin.module.css'

export default function EditJadwalPage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        time: '',
        type: 'harian',
        day: '',
        description: ''
    })

    useEffect(() => {
        fetchSchedule()
    }, [id])

    const fetchSchedule = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedule/${id}`)
            const data = await res.json()

            if (data.success) {
                setFormData({
                    title: data.data.title,
                    time: data.data.time,
                    type: data.data.type,
                    day: data.data.day || '',
                    description: data.data.description || ''
                })
            } else {
                setError('Jadwal tidak ditemukan')
            }
        } catch (err) {
            setError('Gagal memuat data jadwal')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError('')

        try {
            const token = localStorage.getItem('adminToken')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedule/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (data.success) {
                router.push('/admin/dashboard/jadwal')
            } else {
                setError(data.message || 'Gagal mengupdate jadwal')
            }
        } catch (err) {
            setError('Terjadi kesalahan')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <div className={styles.loading}>Memuat data...</div>
    }

    return (
        <div className={styles.formContainer}>
            <h2>Edit Jadwal</h2>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Nama Kegiatan *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="time">Waktu *</label>
                    <input
                        type="text"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="type">Tipe Jadwal *</label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="harian">Harian</option>
                        <option value="mingguan">Mingguan</option>
                        <option value="bulanan">Bulanan</option>
                        <option value="tahunan">Tahunan</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="day">Hari</label>
                    <select
                        id="day"
                        name="day"
                        value={formData.day}
                        onChange={handleChange}
                    >
                        <option value="">Pilih hari</option>
                        <option value="Senin">Senin</option>
                        <option value="Selasa">Selasa</option>
                        <option value="Rabu">Rabu</option>
                        <option value="Kamis">Kamis</option>
                        <option value="Jumat">Jumat</option>
                        <option value="Sabtu">Sabtu</option>
                        <option value="Ahad">Ahad</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Keterangan</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        style={{ minHeight: '80px' }}
                    />
                </div>

                <div className={styles.formActions}>
                    <button type="submit" className={styles.submitBtn} disabled={saving}>
                        {saving ? 'Menyimpan...' : 'Update Jadwal'}
                    </button>
                    <Link href="/admin/dashboard/jadwal" className={styles.cancelBtn}>
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    )
}
