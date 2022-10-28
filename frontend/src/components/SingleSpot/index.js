import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as SpotActions from "../../store/spots";
import EditSpot from '../EditSpot';
import DeleteSpot from '../DeleteSpot';
import CreateReviewForm from '../CreateReview'
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
    // let reviewfound = reviews?.find(review => sessionUser.id === review.userId)
    // reviewfound ? true : false 
    // console.log('singlespots', reviewfound)
    useEffect(() => {
        dispatch(getSingleSpot(spotId))
        dispatch(getUserReviews())
    },[dispatch, spotId])
    // useEffect(() => {
    //     dispatch(getSingleSpot(spotId))
    //     return(() => {
    //         dispatch(clear())
    //     })
    // })
  console.log(spot)
     return (
        <div className="single-spot-container">
             <div className="singleSpot-card-details">
                    <div><b>{spot?.name}</b></div>
                    <div>Owned by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</div>
                    {spot?.SpotImages?.map(image => <img className='ss-preview-img' src={image.url} />)}
                    <div>{spot?.description}</div> 
                    <div>${spot?.price}</div>
                    <div>{spot?.city}, {spot?.state}</div>
                </div>
       
            {spot.ownerId === sessionUser.id && (
                <>
                <DeleteSpot />
                <EditSpot />
                </>
            )}
            
            <ReviewsForSpot />
            
            {/* {!reviewfound && (
         */}
            <CreateReviewForm />

            {/* )} */}
        </div>
    )
}

export default SingleSpot;