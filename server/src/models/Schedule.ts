import mongoose, { Schema, Document } from 'mongoose'

export interface ISchedule extends Document {
  title: string
  description?: string
  time: string
  type: 'harian' | 'mingguan' | 'bulanan' | 'tahunan'
  day?: string
  createdAt: Date
  updatedAt: Date
}

const ScheduleSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  time: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['harian', 'mingguan', 'bulanan', 'tahunan'],
    default: 'harian'
  },
  day: {
    type: String
  }
}, {
  timestamps: true
})

export default mongoose.model<ISchedule>('Schedule', ScheduleSchema)
