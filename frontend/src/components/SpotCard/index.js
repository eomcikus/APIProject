
import { NavLink,  } from "react-router-dom";
import './spotcard.css'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReviews } from "../../store/reviews";

const SpotCard = ({ spot }) => {
//    const reviews = useSelector(state => state.reviews.spot)
   const dispatch = useDispatch()
//    useEffect(() => {
//         dispatch(getReviews(spot.id))
//     }, [])
// console.log('reviews of spot', reviews)
// if (reviews) {
//     let arr = Object.values(reviews)
//     let sum = 0;
//     arr.map(spot => sum += spot.stars)
//     return avgRating = (sum / arr.length)
// } else {
//     avgRating = 0;
// }
    return (
        <NavLink to={`/spots/${spot.id}`}
            className="spots-container"
            style={{textDecoration: 'none'}}>
            <div className='spot-card-image'>
                <img className='card-image' src={spot.previewImage}></img>
            </div>
            <div className="spot-card-detail-container">
                <div className='spot-card-details'>
                    <p><b>{spot.name}</b></p>
                    <p div className='spot-card-location'>{spot.city}, {spot.state}</p>
                    <p><b>${spot.price}</b> night</p>

                </div>
                <div className='avg-rating'>
                    <p>★ {spot.avgRating ? parseFloat(spot.avgRating).toFixed(2) : 'none'}</p>
                </div>
            </div>

            <p></p>

       
        </NavLink>
    )
}

export default SpotCard;