// API Response Types - sesuai dengan backend contract

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  pagination?: Pagination
}

export interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

// Entity Types
export interface NewsItem {
  _id: string
  title: string
  excerpt: string
  content: string
  image?: string
  category: 'Prestasi' | 'Kegiatan' | 'Pengumuman' | 'Lainnya'
  author: string
  published: boolean
  publishDate: string  // Tanggal publikasi (bisa custom/retroaktif)
  createdAt: string    // Tanggal data dibuat di sistem
  updatedAt: string
}

export interface Schedule {
  _id: string
  title: string
  description?: string
  time: string
  type: 'harian' | 'mingguan' | 'bulanan' | 'tahunan'
  day?: string
  createdAt: string
  updatedAt: string
}

export interface GalleryItem {
  _id: string
  title: string
  description?: string
  image: string
  category: 'Kegiatan' | 'Prestasi' | 'Fasilitas' | 'Santri' | 'Lainnya'
  createdAt: string
  updatedAt: string
}

export interface Admin {
  _id: string
  username: string
  role: 'admin' | 'superadmin'
}

// Auth Types
export interface LoginResponse {
  success: boolean
  token: string
  admin: Admin
}

export interface UploadResponse {
  success: boolean
  data: {
    filename: string
    originalName: string
    size: number
    mimetype: string
    url: string
  }
}
