const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  registerUser,
  loginUser,
  getMe,
  updateBloodType,
} = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.route('/:id').put(protect, updateBloodType)
module.exports = router
