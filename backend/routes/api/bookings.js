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
        console.log('----------------------------------here in backend')
    const currentBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [{
            model: Spot,
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt'],
            } 
        }]
    })
    console.log('current bookings =================', currentBookings)
    for (let i = 0; i < currentBookings.length; i++) {
        
        let curr = currentBookings[i].toJSON()

        const spotImage = await SpotImage.findOne({
            where: {
                spotId: curr.Spot.id,
                preview: true
            }
        })
   
        if (!spotImage) {
            currentBookings[i].Spot.dataValues.previewImage = 'No picture found';
        } else {
            currentBookings[i].Spot.dataValues.previewImage = spotImage.url
        }
    }
    console.log('were in the backend ')
    res.json({ Bookings: currentBookings })
    // }
})

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const thebook = await Booking.findOne({
        where: {
            id: req.params.bookingId
        },
        include: {
            model: Spot,
        },
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
    let rawBooking = await Booking.findByPk(req.params.bookingId,         
        {include: [{
        model: Spot,
        attributes: {
            exclude: ['description', 'createdAt', 'updatedAt'],
        } 
    }]
})

    if (!rawBooking) {
        res.status(404)
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
   let booking = rawBooking.toJSON()


    booking.startDate = booking.startDate.toDateString()
    booking.endDate = booking.endDate.toDateString()
    let currentStart = new Date(booking.startDate).getTime()
    let currentEnd = new Date(booking.endDate).getTime()
    const { startDate, endDate } = req.body

    let requestedStart = new Date(startDate).getTime()
    let requestedEnd = new Date(endDate).getTime()

    if (requestedStart > requestedEnd) {
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
        })
    }
    if (Date.now() > requestedEnd) {
        return res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    }
    if ((requestedStart >= currentStart && requestedStart <= currentEnd)) {
        res.status(403)
        return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
            }
        })
    }
    if (requestedEnd >= currentStart && !requestedEnd <= currentEnd) {
        res.status(403)
        return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
                "endDate": "End date conflicts with an existing booking"
            }
        })
    } else {

        rawBooking.update({

            startDate: req.body.startDate,
            endDate: req.body.endDate
        })
        res.json(rawBooking)
    }
})

module.exports = router;