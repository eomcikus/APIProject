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
    let reviewsobj = useSelector(state=> state.reviews)

    let reviews = useSelector(state => Object.values(state.reviews));
    let reviews2 = Object.values(reviews[0])

    // console.log('reviews in all for spot', Object.values(reviews2))
    // let finalArr = reviews.filter(review => +review.spotId === +spotId);
    // console.log('filteredArr', finalArr)
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const reviewObj = useSelector(state => state.reviews);
    const reviewArr = Object.values(reviewObj);
    const spot = useSelector(state => state.spots.singleSpot);
    // console.log(userReview)
    useEffect(() => {
        dispatch(ReviewsActions.getReviews(spotId))
    }, [dispatch]);
    if (reviews.length === 0) return null;
    // if (array.length === 0) return null;
    return (
        <>
    <div className='spot-avg-reviews'><b>★ {spot.avgStarRating ? parseFloat(spot.avgStarRating).toFixed(2) : 'None'} · {reviews2 ? reviews2.length : 'No'} reviews </b></div><p></p>
        <div className='whole-r-container'>
            <div className='reviews-layout-contain'>
                <div className='reviews-contained'>{reviews2.map(review => (<div className='review-card'>{console.log(review)}
                    <ReviewCard key={review.id} review={review} /></div>))}
                </div>
            </div>
        </div>
        </>

    )
}


export default ReviewsForSpot;