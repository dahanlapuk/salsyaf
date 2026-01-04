'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import styles from '../../../../admin.module.css'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function EditBeritaPage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Kegiatan',
        image: '',
        published: true,
        publishDate: ''
    })

    useEffect(() => {
        fetchNews()
    }, [id])

    const fetchNews = async () => {
        try {
            const res = await fetch(`${API_URL}/api/news/${id}`)
            const data = await res.json()

            if (data.success) {
                setFormData({
                    title: data.data.title,
                    excerpt: data.data.excerpt,
                    content: data.data.content,
                    category: data.data.category,
                    image: data.data.image || '',
                    published: data.data.published,
                    publishDate: data.data.publishDate 
                        ? new Date(data.data.publishDate).toISOString().split('T')[0] 
                        : new Date(data.data.createdAt).toISOString().split('T')[0]
                })
                if (data.data.image) {
                    setImagePreview(data.data.image)
                }
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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Ukuran file maksimal 5MB')
            return
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
        if (!allowedTypes.includes(file.type)) {
            setError('Format file harus JPEG, PNG, GIF, atau WebP')
            return
        }

        setUploading(true)
        setError('')

        try {
            const token = localStorage.getItem('adminToken')
            const formDataUpload = new FormData()
            formDataUpload.append('image', file)

            const res = await fetch(`${API_URL}/api/upload/image?type=news`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataUpload
            })

            const data = await res.json()

            if (data.success) {
                const imageUrl = `${API_URL}${data.data.url}`
                setFormData(prev => ({ ...prev, image: imageUrl }))
                setImagePreview(imageUrl)
            } else {
                setError(data.message || 'Gagal upload gambar')
            }
        } catch (err) {
            setError('Gagal upload gambar. Pastikan server berjalan.')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError('')

        try {
            const token = localStorage.getItem('adminToken')
            const res = await fetch(`${API_URL}/api/news/${id}`, {
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
                    <label>Gambar Berita</label>
                    <div className={styles.uploadSection}>
                        <input
                            type="file"
                            id="imageFile"
                            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="imageFile" className={styles.uploadBtn}>
                            {uploading ? '⏳ Mengupload...' : '📷 Pilih Gambar'}
                        </label>
                        <span style={{ marginLeft: '1rem', color: '#666', fontSize: '0.85rem' }}>
                            atau masukkan URL di bawah
                        </span>
                    </div>
                    {imagePreview && (
                        <div className={styles.imagePreview}>
                            <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', marginTop: '0.5rem', borderRadius: '8px' }} />
                            <button 
                                type="button" 
                                onClick={() => { setImagePreview(null); setFormData(prev => ({ ...prev, image: '' })) }}
                                style={{ marginLeft: '1rem', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                ❌ Hapus
                            </button>
                        </div>
                    )}
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        style={{ marginTop: '0.5rem' }}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="publishDate">Tanggal Publikasi *</label>
                    <input
                        type="date"
                        id="publishDate"
                        name="publishDate"
                        value={formData.publishDate}
                        onChange={handleChange}
                        required
                    />
                    <small style={{ color: '#666', marginTop: '0.25rem', display: 'block' }}>
                        Bisa diisi tanggal lampau untuk berita retroaktif
                    </small>
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
                    <button type="submit" className={styles.submitBtn} disabled={saving || uploading}>
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
