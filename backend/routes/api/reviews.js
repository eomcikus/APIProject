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
router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [{
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
        },
        {
            model: ReviewImage,
            as: 'ReviewImages',
            attributes: ['id', 'url']
        },
        {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }]
    })
    res.json(reviews)

})

//add an image to a review based on review id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    let currReview = await Review.findAll({
        where: {
            id: req.params.reviewId
        }
    })
    console.log(currReview)
    if (!currReview.length) {
        res.status(404)
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    const reviewImages = ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })
    if (reviewImages.length === 10) {
        res.status(403)
        res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }
    if (!req.user.id === currReview.userId) {
        res.status(403)
        res.json('Unauthorized to make these changes')
    } else {
        const newPic = await ReviewImage.create({
            userId: req.user.id,
            url: req.body.url,
        })
        let finalPic = newPic.toJSON()
        delete finalPic.createdAt
        delete finalPic.updatedAt
        return res.json(finalPic)
    }
})
//delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId)

if (!review){
    res.status(404)
    return res.json({
        "message": "Review couldn't be found",
        "statusCode": 404
      })
    }
if (!req.user.id === review.userId){
    res.status(403)
    return res.json('Unauthorized to make these changes')
} else {
    await review.destroy()
    res.status(200);
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
}
})



//Edit a review
router.put('/:reviewId', requireAuth, async (req, res) => {
    let review = await Review.findByPk(req.params.reviewId)
    if (!review){
        res.status(404)
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }
    if (req.user.id !== review.userId) {
        res.status(403)
        return res.json('Unauthorized to make these changes')
    } else {
        review.update({
            review: req.body.review,
            stars: req.body.stars
        })

        res.json(review)
    }

})

module.exports = router;