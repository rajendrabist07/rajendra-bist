import mongoose, { Schema, Document } from 'mongoose'

export interface IContactMessage extends Document {
  name: string
  email: string
  message: string
  source: string
  timestamp: Date
}

const ContactMessageSchema = new Schema<IContactMessage>({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 180 },
  message: { type: String, required: true, trim: true, maxlength: 3000 },
  source: { type: String, default: 'portfolio-contact' },
  timestamp: { type: Date, default: Date.now },
})

ContactMessageSchema.index({ timestamp: -1 })
ContactMessageSchema.index({ email: 1 })

export default mongoose.models.ContactMessage ||
  mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema)
