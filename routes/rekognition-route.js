const router = require('express').Router()
const { faceEmotions } = require('../controllers/rekognition')
router.post('/', faceEmotions)

module.exports = router