const express = require('express');
const router = express.Router();
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');
const { Booking } = require('../../db/models');
const { Review } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { User } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');


router.get('/:spotId', async (req, res, next) => {
    const spots = await Spot.findByPk(req.params.spotId);
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
        spots,
        numReviews: reviewCount,
        avgStarRating: reviewAvg,
        SpotImages: spotImages,
        Owner
    })
})

router.put('/:spotId', async (req, res) => {




})



module.exports = router;