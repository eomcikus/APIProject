const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');
const { Booking } = require('../../db/models');
const { Review } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { User } = require('../../db/models');

//GET all reviews of the current User
router.get('/current', async (req, res) => {
const reviews = Review.find
})
module.exports = router;