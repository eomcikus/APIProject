import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import * as ReviewsActions from '../../store/reviews';
import { useDispatch } from "react-redux";
import RemoveReview from "../RemoveReview";
import './ReviewsForSpot.css';
import ReviewCard from "../ReviewCard";
const ReviewsForSpot = () => {
    const { spotId } = useParams();
    let reviews = useSelector(state => Object.values(state.reviews.spot));
    // console.log('reviews', reviews)
    let finalArr = reviews.filter(review => +review.spotId === +spotId);
    // console.log('filteredArr', finalArr)
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const reviewObj = useSelector(state => state.reviews.spot);
    const reviewArr = Object.values(reviewObj);
    const spot = useSelector(state => state.spots.singleSpot);
    // console.log(userReview)
    useEffect(() => {
        dispatch(ReviewsActions.getReviews(spotId))
    }, [dispatch]);
    if (reviews.length === 0) return null;
    if (finalArr.length === 0) return null;
    return (
        <div className='true-review-container' >
            <div className='spot-avg-reviews' id='bold-letters'><b>★ {spot.avgStarRating ? parseFloat(spot.avgStarRating).toFixed(2) : 'None'} · {reviewArr ? reviewArr.length : 'No'} reviews </b><p></p>
                <div className='reviews-contained'>{finalArr.map(review => (<div className='review-card'>
                    <ReviewCard key={review.id} review={review} /></div>))}
                </div>
            </div>
        </div>
    )
}


export default ReviewsForSpot;