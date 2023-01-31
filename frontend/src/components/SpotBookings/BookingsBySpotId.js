import { getSpotBookings } from "../../store/bookings";
import { getSingleSpot } from "../../store/spots";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, useParams } from 'react-router-dom';


const BookingsForSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.bookings)
    console.log('bookings state', bookings)
    const spot = useSelector(state => state.spots.singleSpot)
    const bookingsArr = Object.values(bookings)
    // console.log('bookingsarr', bookingsArr[0])
    useEffect(() => {
        dispatch(getSpotBookings(spotId))
        dispatch(getSingleSpot(spotId))
    }, [dispatch])

    return (
        <div>
            <h1>{spot.name}</h1>
            {bookingsArr.map(booking => (
                <div key={booking.id}>{booking.spotId}</div>
            ))}
        </div>
    )
}

export default BookingsForSpot;
