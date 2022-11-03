import './ReviewCard.css';
import { useSelector, useDispatch } from 'react-redux';


const ReviewCard = ({review}) => {
    const spot = useSelector(state => state.spots.singleSpot)
    const dispatch = useDispatch()
    return (
        
        <div className='review-container'>
            <div className='spot-review-info'></div>
            <div className='review-userName'>
            {review?.User.firstName}
            </div>
            
        </div>
        
    )
}

export default ReviewCard;