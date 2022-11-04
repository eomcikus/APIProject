import './ReviewCard.css';
import { useSelector, useDispatch } from 'react-redux';


const ReviewCard = ({review}) => {
    console.log('review', review)
    const spot = useSelector(state => state.spots.singleSpot)
    const dispatch = useDispatch()
    return (
        
        <div className='review-container'>
            {/* <div className='spot-review-info'></div> */}
            <div className='review-userName'>
            {review?.User.firstName}
            <div className='review-content'>
                {review?.review}
            </div>
            </div>
        </div>
        // <div>{review?.review}, {review?.stars} by: {review?.User?.firstName} {review?.User?.lastName}
        // {sessionUser && sessionUser.id === review.userId && (
        //     <RemoveReview />
    )
}

export default ReviewCard;