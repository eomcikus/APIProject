import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import './createbooking.css'
import { addBooking, getUserBookings } from '../../store/bookings';
const CreateBooking = () => {
    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.reviews)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const {spotId} = useParams()
    const dayjs = require('dayjs')
    const history = useHistory()
    const [startDate, setStartDate] = useState('')
    console.log('startdate', startDate)
    const [endDate, setEndDate] = useState('')
    const [submit, setSubmit] = useState(false)
    // console.log('reviews in create booking', reviews)
    const handleSubmit = async (e) => {
        e.preventDefault()
        let createdBooking;
        const payload = {
            spotId: spot.id,
            userId: user.id,
            startDate,
            endDate,
        }
        setSubmit(true)
        // console.log('spotid', +spotId)
        createdBooking = await dispatch(addBooking(payload, +spotId))
        window.alert('Booking successfully created!')
        await dispatch(getUserBookings())
        history.push('/bookings/current')
    }
    return (
        <>
        <form className='booking-form' onSubmit={handleSubmit}>
            <div className='booking-object'>
                {/* <label>Start</label> */}
                <div className='booking-spot-info-cont'>
                    <div className='spot-price-cont'><div className='spot-price'>${spot.price}   </div> <div>{'  '} night </div></div>
                    <div className='booking-spot-review-info'><div>★    {spot.avgStarRating}        {'        ·   '}</div>   <div className='num-reviews'> {spot.numReviews} reviews</div></div></div>
                <div className='calendar-cont'>
                    <input type='date' 
                    id='calendar-left'
                    value={dayjs(startDate).format("YYYY-MM-DD")} 
                    onChange={e => setStartDate(e.target.value)} />
                  
                    {/* <label>End</label> */}
                    <input type='date' 
                    id='calendar-right'
                    value={dayjs(endDate).format("YYYY-MM-DD")}
                    onChange={e => setEndDate(e.target.value)} />
                </div>
                <button className='reserve-button' type='submit'>Reserve</button>
            </div>
            </form>
        </>
    )
}

export default CreateBooking