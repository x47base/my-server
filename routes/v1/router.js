const express = require('express');
const router = express.Router();

const authroute = require('./auth')
router.use('/auth', authroute)

const adminroute = require('./admin')
router.use('/admin', adminroute)

module.exports = router;