import mongoose, { Schema, Document } from 'mongoose'

export interface ISchedule extends Document {
  title: string
  description?: string
  time: string
  type: 'daily' | 'weekly' | 'monthly'
  day?: string
  recurring: boolean
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
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily'
  },
  day: {
    type: String
  },
  recurring: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.model<ISchedule>('Schedule', ScheduleSchema)
