'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import styles from '../../../../admin.module.css'

export default function EditBeritaPage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Kegiatan',
        image: '',
        published: true
    })

    useEffect(() => {
        fetchNews()
    }, [id])

    const fetchNews = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`)
            const data = await res.json()

            if (data.success) {
                setFormData({
                    title: data.data.title,
                    excerpt: data.data.excerpt,
                    content: data.data.content,
                    category: data.data.category,
                    image: data.data.image || '',
                    published: data.data.published
                })
            } else {
                setError('Berita tidak ditemukan')
            }
        } catch (err) {
            setError('Gagal memuat data berita')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError('')

        try {
            const token = localStorage.getItem('adminToken')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (data.success) {
                router.push('/admin/dashboard/berita')
            } else {
                setError(data.message || 'Gagal mengupdate berita')
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
            <h2>Edit Berita</h2>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Judul Berita *</label>
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
                    <label htmlFor="excerpt">Ringkasan *</label>
                    <textarea
                        id="excerpt"
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        style={{ minHeight: '80px' }}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="content">Konten Berita *</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="category">Kategori *</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="Kegiatan">Kegiatan</option>
                        <option value="Prestasi">Prestasi</option>
                        <option value="Pengumuman">Pengumuman</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="image">URL Gambar</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            name="published"
                            checked={formData.published}
                            onChange={handleChange}
                            style={{ width: 'auto' }}
                        />
                        Published
                    </label>
                </div>

                <div className={styles.formActions}>
                    <button type="submit" className={styles.submitBtn} disabled={saving}>
                        {saving ? 'Menyimpan...' : 'Update Berita'}
                    </button>
                    <Link href="/admin/dashboard/berita" className={styles.cancelBtn}>
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    )
}
