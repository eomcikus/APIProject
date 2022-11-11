import './ReviewCard.css';
import { useSelector, useDispatch } from 'react-redux';
import RemoveReview from '../RemoveReview';

const ReviewCard = ({ review }) => {
    console.log('review', review)
    const spot = useSelector(state => state.spots.singleSpot)
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    if (!review) return null;
     return (

        <div className='review-container'>
            <div className='review-card-layout'>
                <div className='review-userName'>
                    {review?.User.firstName}
                    <div className='review-content'>
                        {review?.review}
                        {sessionUser && sessionUser.id === review.userId && (
                            <RemoveReview />)}


                    </div>
                </div>
            </div>
        </div>

    )
}

export default ReviewCard;