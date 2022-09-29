const express = require('express');
const { json } = require('sequelize');
const { sequelize } = require('sequelize')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');
const { Booking } = require('../../db/models');
const { Review } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { User } = require('../../db/models');
const { route } = require('./users');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//get all of the current user's bookings
router.get('/current', requireAuth, async (req, res) => {
    // if (req.user){
        const currentBookings = await Booking.findAll({
            where: {
                userId: req.user.id
            }
        })
        console.log(currentBookings)
    // }
})

module.exports = router;