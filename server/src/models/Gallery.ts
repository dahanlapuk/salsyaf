import mongoose, { Schema, Document } from 'mongoose'

export interface IGallery extends Document {
  title: string
  description?: string
  imageUrl: string
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
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['kegiatan', 'fasilitas', 'acara'],
    default: 'kegiatan'
  }
}, {
  timestamps: true
})

export default mongoose.model<IGallery>('Gallery', GallerySchema)
