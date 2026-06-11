import mongoose from 'mongoose'

const ChatMessageSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true },
  userMessage: { type: String, required: true },
  aiResponse: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
})

const ChatMessage = mongoose.models.ChatMessage || mongoose.model('ChatMessage', ChatMessageSchema)

export default ChatMessage
