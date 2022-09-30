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

router.put('/:bookingId', requireAuth, async (req, res) => {
    let booking = await Booking.findByPk(req.params.bookingId)
    booking = booking.toJSON()
    
    if (!booking){
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }
    if (booking.userId !== req.user.id){
        return res.json({
            statusCode: 403,
            message: 'Unauthorized to make these changes'
        })
    }
    booking.startDate = booking.startDate.toDateString()
    booking.endDate = booking.endDate.toDateString()
    let currentStart = new Date(booking.startDate).getTime()
    let currentEnd = new Date(booking.endDate).getTime()
    
    const {startDate, endDate} = req.body
    console.log(new Date(startDate).getTime())

    // booking.update({

    // })
})

// } else {
//     spotNew.update({
//         address: req.body.address,
//         city: req.body.city,
//         state: req.body.state,
//         country: req.body.country,
//         lat: req.body.lat,
//         lng: req.body.lng,
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price
//     })
//     res.json(spotNew)
// }

module.exports = router;