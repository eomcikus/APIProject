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

router.delete('/:imageId', requireAuth, async (req, res) => {
    let image = await SpotImage.findByPk(req.params.imageId, {
        include: {
            model: Spot
        }
    })

    if (!image) {
        res.status(404)
        return res.json({
            "message": "Spot image couldn't be found",
            "statusCode": 404
        })
    }

    if (image.Spot.ownerId !== req.user.id) {
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    } 
    else if (image.Spot.ownerId === req.user.id){
        await image.destroy()
        res.status(200)
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
})
module.exports = router;