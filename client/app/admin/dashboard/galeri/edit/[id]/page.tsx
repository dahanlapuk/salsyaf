'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import styles from '../../../../admin.module.css'

export default function EditGaleriPage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        category: 'Kegiatan'
    })

    useEffect(() => {
        fetchGalleryItem()
    }, [id])

    const fetchGalleryItem = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${id}`)
            if (res.ok) {
                const json = await res.json()
                // Backend returns { success, data } - extract data.data
                const item = json.data || json
                setFormData({
                    title: item.title || '',
                    description: item.description || '',
                    image: item.image || '',
                    category: item.category || 'Kegiatan'
                })
            } else {
                setError('Foto tidak ditemukan')
            }
        } catch (err) {
            setError('Gagal memuat data foto')
        } finally {
            setFetching(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const token = localStorage.getItem('adminToken')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (data.success) {
                router.push('/admin/dashboard/galeri')
            } else {
                setError(data.message || 'Gagal memperbarui foto')
            }
        } catch (err) {
            setError('Terjadi kesalahan. Pastikan server berjalan.')
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <div className={styles.formContainer}>
                <p>Memuat data...</p>
            </div>
        )
    }

    return (
        <div className={styles.formContainer}>
            <h2>Edit Foto Galeri</h2>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Judul / Keterangan *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Contoh: Kegiatan Sholawatan Bersama"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Deskripsi</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Deskripsi singkat tentang foto (opsional)"
                        rows={3}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="image">URL Gambar *</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        required
                    />
                </div>

                {formData.image && (
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label>Preview:</label>
                        <div style={{ 
                            marginTop: '0.5rem',
                            maxWidth: '300px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid #e0e0e0'
                        }}>
                            <img 
                                src={formData.image} 
                                alt="Preview"
                                style={{ 
                                    width: '100%', 
                                    height: 'auto',
                                    display: 'block'
                                }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg'
                                }}
                            />
                        </div>
                    </div>
                )}

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
                        <option value="Fasilitas">Fasilitas</option>
                        <option value="Santri">Santri</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                </div>

                <div className={styles.formActions}>
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Menyimpan...' : 'Update Foto'}
                    </button>
                    <Link href="/admin/dashboard/galeri" className={styles.cancelBtn}>
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    )
}
