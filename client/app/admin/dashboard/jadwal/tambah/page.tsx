'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '../../../admin.module.css'

export default function TambahJadwalPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        time: '',
        type: 'harian',
        day: '',
        description: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const token = localStorage.getItem('adminToken')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedule`, {
                method: 'POST',
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
                setError(data.message || 'Gagal menambah jadwal')
            }
        } catch (err) {
            setError('Terjadi kesalahan. Pastikan server berjalan.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.formContainer}>
            <h2>Tambah Jadwal Baru</h2>

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
                        placeholder="Contoh: Sholat Subuh Berjamaah"
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
                        placeholder="Contoh: 04:30 - 05:00"
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
                    <label htmlFor="day">Hari (opsional, untuk jadwal mingguan)</label>
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
                        placeholder="Keterangan tambahan (opsional)"
                        style={{ minHeight: '80px' }}
                    />
                </div>

                <div className={styles.formActions}>
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Menyimpan...' : 'Simpan Jadwal'}
                    </button>
                    <Link href="/admin/dashboard/jadwal" className={styles.cancelBtn}>
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    )
}
