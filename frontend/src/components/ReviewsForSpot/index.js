import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import * as ReviewsActions from '../../store/reviews';
import { useDispatch } from "react-redux";
import RemoveReview from "../RemoveReview";

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
    const userReview = useSelector(state => state.reviews.spot)
    // console.log(userReview)
    useEffect(() => {
        dispatch(ReviewsActions.getReviews(spotId))
        
    }, [dispatch])
    // console.log('spotId', spotId)
//if current user matches review.userid, then display deletereview button
    
    return (
        <div>
            <h1>Reviews</h1>
            {finalArr.map(review => (<div>{review?.review}, {review?.stars} by: {review?.User?.firstName} {review?.User?.lastName} 
            {sessionUser && sessionUser.id === review.userId && (
                <RemoveReview />
            )}</div>))}
            
        </div>
    )
}
export default ReviewsForSpot;