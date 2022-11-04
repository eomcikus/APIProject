import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import * as ReviewsActions from '../../store/reviews';
import { useDispatch } from "react-redux";
import RemoveReview from "../RemoveReview";
import './ReviewsForSpot.css'
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
    // console.log('spotId', spotId)
//if current user matches review.userid, then display deletereview button
    
    return (
        <div>
            <p></p>
            <hr size='1' width='200%' color='light gray'></hr>
            <div className='spot-avg-reviews'>★{spot.avgStarRating} · {reviewArr.length ? reviewArr.length : 'No'} reviews</div> <p></p>
            {finalArr.map(review => (<div>{review?.review}, {review?.stars} by: {review?.User?.firstName} {review?.User?.lastName} 
            {sessionUser && sessionUser.id === review.userId && (
                <RemoveReview />
            )}</div>))}
            
        </div>
    )
}
export default ReviewsForSpot;