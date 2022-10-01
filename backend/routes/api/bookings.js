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
    res.json({ Bookings: currentBookings })
    // }
})

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const thebook = await Booking.findOne({
        where: {
            id: req.params.bookingId
        },
        include: {
            model: Spot
        }
    })

    if (!thebook) {
        res.status(404)
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
    if (req.user.id === thebook.userId || thebook.Spot.ownerId) {
        await thebook.destroy()
    }
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

router.put('/:bookingId', requireAuth, async (req, res) => {
    let booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
    booking = booking.toJSON()

    // console.log(booking)
    // if (booking.userId !== req.user.id){
    //     return res.json({
    //         "message": "Forbidden",
    //         "statusCode": 403
    //       })
    // }
    //add todatestring()
    booking.startDate = booking.startDate.toDateString()
    booking.endDate = booking.endDate.toDateString()
    let currentStart = new Date(booking.startDate).getTime()
    let currentEnd = new Date(booking.endDate).getTime()
    const { startDate, endDate } = req.body

    let requestedStart = new Date(startDate).getTime()
    let requestedEnd = new Date(endDate).getTime()
    // console.log('curr', currentStart, currentEnd)
    // console.log('req', requestedStart, requestedEnd)
    if (requestedStart > requestedEnd) {
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
        })
    }
    if (Date.now() > requestedEnd){
        return res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
          })
    }

    if ((requestedStart >= currentStart)) {
        res.status(403)
        return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
            }
        })
    }
    if (requestedEnd <= currentEnd) {
        // res.status(403)
        return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
                "endDate": "End date conflicts with an existing booking"
            }
        })

    }
    booking.update({

        "startDate": req.body.startDate,
        "endDate": req.body.endDate
    })
    res.json(booking)

    })

    module.exports = router;