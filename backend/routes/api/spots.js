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
// const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//GET details of spot by spotId
router.get('/:spotId', async (req, res, next) => {

    const spots = await Spot.findAll({
        where: {
            id: req.params.spotId
        },
        include: [{
            model: SpotImage
        },
        {
            model: User
        }]
    });
    if (spots.length === 0) {
        const err = new Error('No spot found')
        err.status = 404
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const reviewCount = await Review.count({
        where: {
            spotId: req.params.spotId
        }
    })

    const reviewSum = await Review.sum('stars', {
        where:
        {
            spotId: req.params.spotId
        }
    })
    console.log(spots)
    const reviewAvg = await (reviewSum / reviewCount)

    const spotImages = await SpotImage.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: ['id', 'url', 'preview']
    })

    const Owner = await User.findAll({
        where: {
            id: spots.ownerId
        },
        attributes: ['id', 'firstName', 'lastName']
    })


    res.json({
        array
    })

})

router.get('/', async (req, res) => {
    let spots = await Spot.findAll({
        include: [{
            model: SpotImage
        },
        {
            model: Review
        }]
    })

    let spotsList = []
    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    })

    // spotsList.forEach(spot => {
    //     spot.Reviews.forEach(rating => {
    //         let average = sequelize.fn("AVG", sequelize.col("stars"))
    //         console.log(average)
    //     })
    // })
    spotsList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                return spot.previewImage = image.url
            } if (image.preview === false) {
                spot.previewImage = 'No preview Image found'
            }
        })
    })

})

// router.put('/:spotId', async (req, res) => {
// })

//Delete a spot by spotid
router.delete('/:spotId', async (req, res) => {
    const spot = await Spot.findAll({
        where: {
            id: req.params.spotId
        },
    })
    if (spot.length === 0) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
console.log(spot)
    if (req.user.id === spot.ownerId) {
       await spot.destroy()
        res.status(200);
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    } else res.send('hi')
})
router.post('/', requireAuth, handleValidationErrors, async (req, res, next) => {
   
    if (req.user){
       let newSpot = await Spot.create(req.body)
       ownerId = newSpot.id
       newSpot.ownerId = newSpot.id
       res.status(201)
       res.json(newSpot)
    }
    if (handleValidationErrors){
        console.log(hi)
    }
})
module.exports = router;