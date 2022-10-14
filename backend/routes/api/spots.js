const express = require('express');
const { json } = require('sequelize');
const { sequelize } = require('../../db/models');
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



// GET spots of current user
router.get('/current', requireAuth, async (req, res, next) => {
    // if (req.user) {

    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },

        // attributes:  [ 'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
        //                 [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
        //             ],  
        //             group: ['Spot.id'],
        //             raw: true

    })

    for (let i = 0; i < spots.length; i++) {
        const spotImage = await SpotImage.findOne({
            where: {
                spotId: spots[i].id,
                preview: true
            }
        })

        if (!spotImage) {
            spots[i].dataValues.previewImage = 'No picture found';
        } else {
            spots[i].dataValues.previewImage = spotImage.url
        }
        const reviewCount = await Review.count({
            where: {
                spotId: spots[i].id,

            },

        })
        if (reviewCount === 0) {
            spots[i].dataValues.avgReview = 0
        }
        const reviewSum = await Review.sum('stars',
            {
                where: {
                    spotId: spots[i].id,
                }
            })
            if (reviewSum === null){
                spots[i].dataValues.avgReview = 0
            } else {
        const reviewAvg = (parseInt(reviewSum) / parseInt(reviewCount))
        spots[i].dataValues.avgReview = reviewAvg
            }

    }
    res.json({ Spots: spots })
})


//ppost a new review based on spot id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    let spot = await Spot.findAll({
        where: {
            id: req.params.spotId
        }
    })

    if (!spot.length) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    spot = spot[0].toJSON()
    const reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId,
            userId: req.user.id
        }
    })

    if (reviews.length) {
        res.status(403)
        return res.json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    }
    const newReview = await Review.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        review: req.body.review,
        stars: req.body.stars
    })
    res.status(201)
    return res.json(newReview)

})

//get all bookings for a spot based on spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const bookingsOwner = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }]
    })
    let bookList = [];
    bookingsOwner.forEach(booking => {
        bookList.push(booking.toJSON())
    })
    const bookingsUser = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] }
    })
    let spotCheck = await Spot.findByPk(req.params.spotId)
    if (!spotCheck) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    spotCheck = spotCheck.toJSON()

    if (req.user.id === spotCheck.ownerId) {
        res.json({ Bookings: bookList })
    } else {
        res.json({ Bookings: bookingsUser })
    }
})
//create a booking from a spot based on the spots id
router.post('/:spotId/bookings', requireAuth, handleValidationErrors, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    })
    const spot = await Spot.findAll({
        where: {
            id: req.params.spotId
        }
    })

    if (!spot.length) {

        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    let parsedStartDate;
    let parsedEndDate;

    let bookArray = []
    bookings.forEach(booking => {
        bookArray.push(booking.toJSON())
    })
    // making datestrings on each start and end day
    // bookArray.forEach(booking => {
    //     booking.startDate = (booking.startDate.toDateString())
    //     booking.endDate = (booking.endDate.toDateString())

    // })
    // calling getTime on each
    // bookArray.forEach(booking => {
    //     booking.startDate = new Date(booking.startDate).getTime()
    //     booking.endDate = new Date(booking.startDate).getTime()
    // })
    bookArray.forEach(booking => {
        parsedStartDate = Date.parse(booking.startDate)
        parsedEndDate = Date.parse(booking.startDate)
    })

let requestedStart = Date.parse(req.body.startDate)
let requestedEnd = Date.parse(req.body.endDate)


    for (let i = 0; i < bookArray.length; i++) {
        let booking = bookArray[i]

        if ((requestedStart >= booking.startDate && requestedEnd <= booking.endDate)) {
            res.status(403)
            return res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            })
        }
        if (requestedEnd >= booking.parsedStartDate && !requestedEnd <= booking.parsedEndDate) {
            res.status(403)
            return res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            })
        }
    }

    if (spot.ownerId === req.user.id) {
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    } else {
        const newBooking = await Booking.create({
            spotId: req.params.spotId,
            userId: req.user.id,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        })
        return res.json(newBooking)
    }
})

router.get('/:spotId/reviews', async (req, res, next) => {
    const reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url'],
        },],
    })
    if (!reviews.length) {

        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    res.json({ Reviews: reviews })
})

//GET details of spot by spotId
router.get('/:spotId', async (req, res, next) => {

    const spots = await Spot.findAll({
        where: {
            id: req.params.spotId
        },
        include: [{
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        },
        {
            model: User,
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']

        }]
    });
    if (!spots.length) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    let spotsFixed = spots[0].toJSON()

    if (spotsFixed.SpotImages.preview === true) {
        return spotsFixed.previewImage = image.url
    }
    if (spotsFixed.SpotImages.preview === false) {
        spotsFixed.previewImage = 'No preview Image found'
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

    const reviewAvg = await (reviewSum / reviewCount)

    spotsFixed.numReviews = reviewCount
    spotsFixed.avgStarRating = reviewAvg
    res.json(spotsFixed)

})
//Edit a Spot
router.put('/:spotId', requireAuth, handleValidationErrors, async (req, res, next) => {
    const spotNew = await Spot.findByPk(req.params.spotId)
    // let spotNew = spot
    if (!spotNew) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (req.user.id !== spotNew.ownerId) {
        res.status(403)
        res.json('Unauthorized to make these changes')
    } else {
        spotNew.update({
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            lat: req.body.lat,
            lng: req.body.lng,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        })
        res.json(spotNew)
    }

})
//GET all spots
router.get('/', async (req, res) => {
    let pagination = {}
    let { page, size } = req.query
    page = parseInt(page)
    size = parseInt(size)
    if (page === undefined || page <= 0 || isNaN(page)) {
        page = 1
    } else {
        page = parseInt(page)
    }
    if (size === undefined || size <= 0 || isNaN(size)) {
        size = 20
    } else {
        size = parseInt(size)
    }
    pagination.limit = size
    pagination.offset = (page - 1) * size

    let spots = await Spot.findAll({
        include: [{
            model: Review,
            attributes: []
        },
        {
            model: SpotImage,
            attributes: []
        }],
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']],
        group: ['Spot.id'],
        raw: true,

    }, { ...pagination })

    for (let i = 0; i < spots.length; i++) {

        let curr = spots[i]
        const spotImage = await SpotImage.findOne({
            where: {
                spotId: curr.id,
                preview: true
            }
        })

        if (!spotImage) {
            spots[i].previewImage = 'No picture found';
        } else {
            spots[i].previewImage = spotImage.url
        }
    }
    res.json({ Spots: spots, page, size })

})




//Delete a spot by spotid
router.delete('/:spotId', async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (req.user.id === spot.ownerId) {
        await spot.destroy()
        res.status(200);
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
})
//Create a new spot
router.post('/', requireAuth, handleValidationErrors, async (req, res, next) => {

    if (req.user) {
        let newSpot = await Spot.create(req.body)
        newSpot.ownerId = req.user.id
        await newSpot.save()

        res.status(201)
        res.json(newSpot)
    }

})

//create an image for a spot based on spots id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        let err = new Error()
        res.status(404)
        res.send({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    } else {

        let newSpot = spot.toJSON()
        if (!req.user.id === newSpot.ownerId) {
            let err = new Error()
            res.status(403)
            res.send('Unauthorized to make these changes')
        } else {
            const newPic = await SpotImage.create({
                url: req.body.url,
                spotId: req.params.spotId,
                preview: req.body.preview
            })
            let finalPic = newPic.toJSON()
            delete finalPic.createdAt
            delete finalPic.updatedAt
            delete finalPic.spotId
            return res.json(finalPic)
        }
    }

})

module.exports = router;