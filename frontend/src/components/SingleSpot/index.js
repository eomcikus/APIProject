import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as SpotActions from "../../store/spots"; 
import EditSpot from '../EditSpotModal';
import DeleteSpot from '../DeleteSpotModal';
import CreateReviewModal from '../CreateReviewModal'
import ReviewsForSpot from '../ReviewsForSpot';
import reviewReducer from '../../store/reviews';
import { getUserReviews } from '../../store/reviews';
import { clear, getSingleSpot } from '../../store/spots';
import './SingleSpot.css'
const SingleSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot)
    const sessionUser = useSelector(state => state.session.user)
    const reviews = useSelector(state => Object.values(state.reviews.spot))
    console.log('reviews', reviews)
    let reviewfound; 
    if (sessionUser) reviewfound = reviews?.find(review => sessionUser.id === review.userId)
    reviewfound ? reviewfound = true : reviewfound = false
    console.log('reviewfound', reviewfound)
    useEffect(() => {
        dispatch(getSingleSpot(spotId))
        // dispatch(getUserReviews())
    },[dispatch, spotId])
    // useEffect(() => {
    //     dispatch(getSingleSpot(spotId))
    //     return(() => {
    //         dispatch(clear())
    //     })
    // })
//   console.log('spot', spot)
     return (
        <div className="single-spot-container">
             <div className="singleSpot-card-details">
                    <div className='singleSpot-name'>{spot?.name}</div><p></p>
                    <div className='single-spot-stars'>★{spot?.avgStarRating}  ·   {spot?.city}, {spot?.state}</div>
                    {/* <div>{spot?.city}, {spot?.state}</div> */}<p></p>
                    {spot?.SpotImages?.map(image => <img className='ss-preview-img' src={image.url} />)}
                    <div>Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</div>
                    <div>{spot?.description}</div> 
                    <div>${spot?.price} per night</div>
                </div>
       
            {sessionUser && spot.ownerId === sessionUser.id && (
                <>
                <DeleteSpot />
                <EditSpot />
                </>
            )}
            
            <ReviewsForSpot />
            
            {sessionUser && 
            reviewfound === false && 
            spot.ownerId !== sessionUser.id && (
        
            <CreateReviewModal />

            )}
        </div>
    )
}

export default SingleSpot;