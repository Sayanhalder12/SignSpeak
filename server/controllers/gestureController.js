const Gesture = require('../models/Gesture')

const createGesture = async (req, res) => {
  try {
    const { fingerValues, outputText } = req.body
    console.log('Saving gesture:', { fingerValues, outputText })

    const gesture = new Gesture({ fingerValues, outputText })
    const savedGesture = await gesture.save()

    res.status(201).json(savedGesture)
  } catch (error) {
    res.status(500).json({ message: 'Failed to save gesture', error: error.message })
  }
}

const getGestures = async (req, res) => {
  try {
    console.log('Fetching all gestures')
    const gestures = await Gesture.find().sort({ createdAt: -1 })

    res.json(gestures)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch gestures', error: error.message })
  }
}

module.exports = { createGesture, getGestures }
