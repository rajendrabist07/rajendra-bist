import mongoose, { Schema, Document } from 'mongoose'

export interface IChatMessage extends Document {
  sessionId: string
  userMessage: string
  aiResponse: string
  timestamp: Date
}

const ChatMessageSchema = new Schema<IChatMessage>({
  sessionId: { type: String, required: true, index: true },
  userMessage: { type: String, required: true, maxlength: 2000 },
  aiResponse: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
})

ChatMessageSchema.index({ timestamp: 1 }, { expireAfterSeconds: 2592000 })

export default mongoose.models.ChatMessage ||
  mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema)
