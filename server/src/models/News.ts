import mongoose, { Schema, Document } from 'mongoose'

export interface INews extends Document {
  title: string
  content: string
  excerpt: string
  image?: string
  author: string
  category: string
  published: boolean
  publishDate: Date  // Tanggal publikasi (bisa custom/retroaktif)
  createdAt: Date    // Tanggal data dibuat di sistem
  updatedAt: Date
}

const NewsSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  author: {
    type: String,
    required: true,
    default: 'Admin'
  },
  category: {
    type: String,
    required: true,
    enum: ['Prestasi', 'Kegiatan', 'Pengumuman', 'Lainnya'],
    default: 'Lainnya'
  },
  published: {
    type: Boolean,
    default: true
  },
  publishDate: {
    type: Date,
    default: Date.now  // Default ke tanggal sekarang, tapi bisa di-override
  }
}, {
  timestamps: true
})

export default mongoose.model<INews>('News', NewsSchema)
