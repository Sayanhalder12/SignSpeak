const mongoose = require('mongoose')

const gestureSchema = new mongoose.Schema(
  {
    fingerValues: {
      type: [Number],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length === 5,
        message: 'fingerValues must contain exactly 5 numbers',
      },
    },
    outputText: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
)

const Gesture = mongoose.model('Gesture', gestureSchema)

module.exports = Gesture
