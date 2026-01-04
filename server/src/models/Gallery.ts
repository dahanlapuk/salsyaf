import mongoose, { Schema, Document } from 'mongoose'

export interface IGallery extends Document {
  title: string
  description?: string
  image: string
  category: string
  createdAt: Date
  updatedAt: Date
}

const GallerySchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Kegiatan', 'Prestasi', 'Fasilitas', 'Santri', 'Lainnya'],
    default: 'Kegiatan'
  }
}, {
  timestamps: true
})

export default mongoose.model<IGallery>('Gallery', GallerySchema)
