import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import * as ReviewsActions from '../../store/reviews';
import { useDispatch } from "react-redux";
import RemoveReview from "../RemoveReview";
import './ReviewsForSpot.css'
import ReviewCard from "../ReviewCard";
const ReviewsForSpot = () => {
    const { spotId } = useParams()
    let reviews = useSelector(state => Object.values(state.reviews.spot))
    // console.log('reviews', reviews)
    // let reviewArr = Object.values(reviews)
    // console.log('reviewArr', reviewArr)
    let finalArr = reviews.filter(review => +review.spotId === +spotId)
    // console.log('filteredArr', finalArr)
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const reviewArr = useSelector(state => Object.values(state.reviews.spot))
    const spot = useSelector(state => state.spots.singleSpot)
    // console.log(userReview)
    
    useEffect(() => {
        
        dispatch(ReviewsActions.getReviews(spotId))
        
    }, [dispatch])
    if (!finalArr) return null
    
    // console.log('spotId', spotId)
//if current user matches review.userid, then display deletereview button
    return (
        <div className='true-review-container'>
            <div className='spot-avg-reviews'>★{spot.avgStarRating} · {reviewArr.length ? reviewArr.length : 'No'} reviews <p></p>
           <div className='reviews-contained'>{finalArr.map(review => (<div className='review-card'>
                <ReviewCard key={review.id} review={review} /></div>))}
                </div> 
                </div>
                </div>
    )
}

   
export default ReviewsForSpot;