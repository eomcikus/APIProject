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

//GET all reviews of the current User
// router.get('/current', async (req, res) => {
// const reviews = Review.findAll({
//     where: {
//         id: req.user.id
//     },
//     include: [{
//         model: Spot
//     },
//     {
//         model: ReviewImage
//     }]
// })
// res.json(reviews)
// })

//add an image to a review based on review id
router.post('/:reviewId/images', requireAuth, async (req, res)=> {
   let currReview = await Review.findOne({
    where: {
        id: req.params.reviewId
    }
   })
   if (!currReview.length){
       res.status(404)
       return res.json({
           "message": "Review couldn't be found",
           "statusCode": 404
        })
    }
    currReview = currReview.toJSON()
    if (!req.user.id === currReview.userId) {
        let err = new Error()
        res.status(403)
        res.json('Unauthorized to make these changes')
    } else {
        const newPic = await ReviewImage.create({
            reviewId: req.params.reviewId,
            url: req.body.url,
        })
        return res.json(newPic)
    }
}
)

module.exports = router;