'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '../../../admin.module.css'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function TambahGaleriPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        category: 'Kegiatan'
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
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

            const res = await fetch(`${API_URL}/api/upload/image?type=gallery`, {
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
        setLoading(true)
        setError('')

        try {
            const token = localStorage.getItem('adminToken')
            const res = await fetch(`${API_URL}/api/gallery`, {
                method: 'POST',
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
                setError(data.message || 'Gagal menambah foto')
            }
        } catch (err) {
            setError('Terjadi kesalahan. Pastikan server berjalan.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.formContainer}>
            <h2>Tambah Foto Galeri</h2>

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
                    <label>Upload Gambar *</label>
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
                    {(imagePreview || formData.image) && (
                        <div className={styles.imagePreview}>
                            <img 
                                src={imagePreview || formData.image} 
                                alt="Preview" 
                                style={{ maxWidth: '200px', marginTop: '0.5rem', borderRadius: '8px' }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg'
                                }}
                            />
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
                        <option value="Fasilitas">Fasilitas</option>
                        <option value="Santri">Santri</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                </div>

                <div className={styles.formActions}>
                    <button type="submit" className={styles.submitBtn} disabled={loading || uploading}>
                        {loading ? 'Menyimpan...' : 'Simpan Foto'}
                    </button>
                    <Link href="/admin/dashboard/galeri" className={styles.cancelBtn}>
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    )
}
