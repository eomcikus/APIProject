import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { editBooking } from '../../store/bookings';
import { getSingleSpot } from '../../store/spots';
const EditBooking = ({booking, setShowModal}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    // const {spotId} = useParams()

    const [startDate, setStartDate] = useState(booking?.startDate)
    const [endDate, setEndDate] = useState(booking?.endDate)
    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        setStartDate(booking?.startDate)
        setEndDate(booking?.endDate)
    }, [dispatch])


        const handleSubmit = async (e) => {
            e.preventDefault()
            let createdBooking;
            const payload = {
                spotId: booking?.spotId,
                userId: user.id,
                startDate,
                endDate,
            }
            setSubmit(true)
            // console.log('spotid', +spotId)
            createdBooking = await dispatch(editBooking(payload, +booking.spotId))
            setShowModal(false)
            window.alert('Booking successfully updated!')
    }
    
    if (!booking) return null
    return (
        <form className='booking-form' onSubmit={handleSubmit}>
            <div className='booking-object'>
                {/* <label>Start</label> */}
                <div className='booking-spot-info-cont'>
                    <div className='spot-price-cont'><div className='spot-price'>${booking.Spot.price}   </div> <div>{'  '} night </div></div></div>

                <div className='calendar-cont'>
                    <input type='date' 
                    id='calendar-left'
                    value={startDate.slice(0,10).toString()} 
                    onChange={e => setStartDate(e.target.value.slice(1, 10))} />
                  
                    {/* <label>End</label> */}
                    <input type='date' 
                    id='calendar-right'
                    value={endDate.slice(0,10).toString()}
                    onChange={e => setEndDate(e.target.value.slice(1, 10))} />
                </div>
                <button className='reserve-button' type='submit'>Reserve</button>
            </div>
            </form>
    )
}


export default EditBooking;