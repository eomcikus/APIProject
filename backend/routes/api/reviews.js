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
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            },
            {
                model: ReviewImage,
                as: 'ReviewImages',
                attributes: ['id', 'url'],
            }],
    })
    for (let i = 0; i < reviews.length; i++) {
        reviews[i].toJSON()
    }
    for (let i = 0; i < reviews.length; i++) {

        const spotImage = await SpotImage.findOne({
            where: {
                spotId: reviews[i].Spot.id,
                preview: true
            }
        })


        if (!spotImage) {
            reviews[i].Spot.dataValues.previewImage = 'No picture found';
        } else {
            reviews[i].Spot.dataValues.previewImage = spotImage.url
        }
    }
    res.json({ Reviews: reviews })

})

//add an image to a review based on review id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    let currReview = await Review.findOne({
        where: {
            id: req.params.reviewId
        }
    })

    if (!currReview) {
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
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    } else {
        const newPic = await ReviewImage.create({
            reviewId: req.params.reviewId,
            userId: req.user.id,
            url: req.body.url,
        })
        let finalPic = newPic.toJSON()
        delete finalPic.createdAt
        delete finalPic.updatedAt
        delete finalPic.reviewId
        res.json(finalPic)
    }
})
//delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        res.status(404)
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    if (!req.user.id === review.userId) {
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
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
    if (!review) {
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