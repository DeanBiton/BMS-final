const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
    getRegisters,
    setRegister,
    deleteRegister,
} = require('../controllers/registerController')

router.route('/').get(protect, getRegisters).post(protect, setRegister)
router.route('/:id').delete(protect, deleteRegister)
    


module.exports = router
