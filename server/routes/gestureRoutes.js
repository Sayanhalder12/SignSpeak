const express = require('express')
const { createGesture, getGestures } = require('../controllers/gestureController')

const router = express.Router()

router.post('/', createGesture)
router.get('/', getGestures)

module.exports = router
