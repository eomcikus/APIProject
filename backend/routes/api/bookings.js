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
            }, 
            include: [{
                model: Spot
            }]
        })
       res.json({ Bookings: currentBookings})
    // }
})

router.delete('/:bookingId', requireAuth, async(req, res) => {
    const thebook = await Booking.findOne({
        where: {
            id: req.params.bookingId
        },
        include: {
            model: Spot
        }
    })

    if (!thebook){
        res.status(404)
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }
    if (req.user.id === thebook.userId || thebook.Spot.ownerId){
        await thebook.destroy()
    }
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})

module.exports = router;