import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import './createbooking.css'
const CreateBooking = () => {
    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.reviews)
    console.log('reviews in create booking', reviews)
    return (
        <>
            <div className='booking-object'>
                {/* <label>Start</label> */}
                <div className='booking-spot-info-cont'>
                    <div className='spot-price-cont'><div className='spot-price'>${spot.price}</div>  night </div>
                    <div className='booking-spot-review-info'><div>★ {spot.avgStarRating}</div>
                        <div className='num-reviews'>{spot.numReviews} reviews</div></div></div>
                <div className='calendar-cont'>
                    <input type='date' id='calendar-left' />
                    {/* <label>End</label> */}
                    <input type='date' id='calendar-right' />
                </div>
                <button className='reserve-button'>Reserve</button>
            </div>
        </>
    )
}

export default CreateBooking