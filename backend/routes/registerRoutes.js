const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
    getRegisters,
    setRegister,
} = require('../controllers/registerController')

router.route('/').get(protect, getRegisters).post(protect, setRegister)

module.exports = router
