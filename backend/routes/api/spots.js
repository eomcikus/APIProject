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

// router.post('/:spotId/images', requireAuth, async(req, res, next) => {
//     if (req.user){
        
//     }
// })


// GET spots of current user
router.get('/current', requireAuth, async(req, res, next) => {
    if (req.user){
        // const owner = await User.findByPk(req.user.id)
        const currentHomes = await Spot.findAll({
            where: {
                ownerId: req.user.id
            }
            
        })
        console.log(currentHomes)
        res.json({currentHomes})
    }
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
            as: 'Owner'
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
    let spotsFixed = spots[0].toJSON()
  
        if (spotsFixed.SpotImages.preview === true){
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
console.log(reviewCount)
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

//GET all spots
router.get('/', async (req, res) => {
    let spots = await Spot.findAll({
        include: [{
            model: SpotImage
        },
        {
            model: Review
        }]
    })
    // console.log(spots)
    // const reviewCount = await Review.count({
    //     where: {
    //         spotId: req.params.spotId
    //     }
    // })
    // const reviewSum = await Review.sum('stars', {
    //     where:
    //     {
    //         spotId: req.params.spotId
    //     }
    // })
    // const reviewAvg = await (reviewSum / reviewCount)
    let spotsList = []
    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    })
console.log(spotsList)
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
    res.json(spots)
    // spotsList.forEach(spot => {
    //     spot.spotReviews.forEach(rating => {
        
    //     })
    // })


})

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
//Create a new spot
router.post('/', requireAuth, handleValidationErrors, async (req, res, next) => {
   
    if (req.user){
       let newSpot = await Spot.create(req.body)
       console.log(newSpot)
       newSpot.ownerId = req.user.id
        console.log(newSpot)
        await newSpot.save()
       res.status(201)
       res.json(newSpot)
    }
    // if (handleValidationErrors){
    //     console.log(hi)
    // }
})

//create an image for a spot based on spots id
router.post('/:spotId/images', requireAuth, async(req, res, next)=> {
    // let { spotId } = req.params.spotId
    const spot = await Spot.findByPk(req.params.spotId)
    // const spot = await Spot.findAll({
    //     where: {
    //         id: req.params.spotId
    //     }

    // })
    if (!spot){
        let err = new Error()
        res.status(404)
        res.send({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    } else {
    
    let newSpot= spot.toJSON()
    if (!req.user.id === newSpot.ownerId){
        let err = new Error()
        res.status(403)
        res.send('Unauthorized to make these changes')
    } else {
        
        const newPic = await SpotImage.create({
           url: req.body.url,
           preview: req.body.preview 
        })
        return res.json(newPic)
    }
    }
    // return console.log(newSpot)
})
//check if spotId/ownerId match req.user id
//find the spot
////create new picture 
//add picture to SpotImages object in Spot Object
module.exports = router;