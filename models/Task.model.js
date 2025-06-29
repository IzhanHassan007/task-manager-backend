import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  dueDate: { 
    type: Date 
  },
  status: { 
    type: String, 
    enum: ['pending', 'in progress', 'completed'], 
    default: 'pending' 
  }
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);
