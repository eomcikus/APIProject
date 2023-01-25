import './ReviewCard.css';
import { useSelector, useDispatch } from 'react-redux';
import RemoveReview from '../RemoveReview';

const ReviewCard = ({ review }) => {
    // console.log('reviews in reviewcard', review)
    const spot = useSelector(state => state.spots.singleSpot)
    const dispatch = useDispatch()
    const reviews = useSelector(state => Object.values(state.reviews))
    console.log(reviews)
    const sessionUser = useSelector(state => state.session.user)
    const newReview = useSelector(state => state.reviews.User)
    // console.log('newReview', newReview)
    // let reviews = useSelector(state => Object.values(state.reviews.spot));
    console.log(reviews)
    // console.log('sessionUser', sessionUser)
    // const review = useSelector(state => state.review.)
    // if (!newReview) return null;
     return (

        <div className='review-container'>
            <div className='review-card-layout'>
                <div className='review-userName'>
                    {reviews.User ? reviews.User.firstName : sessionUser.firstName}</div>
                    <div className='review-content'>
                        {reviews.review}
                        {sessionUser && sessionUser.id === reviews.userId && (
                            <RemoveReview />)}
                    </div>
                </div>
            </div>
     

    )
}

export default ReviewCard;