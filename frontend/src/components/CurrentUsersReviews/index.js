import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewActions from "../../store/reviews";



const CurrentUsersReviews = () => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => Object.values(state.reviews.user))
    console.log('get the reviews', reviews)
    const sessionUser = useSelector(state => state.session.user)
    console.log('current user', sessionUser)
    const finalArr = reviews.filter(review => +review.userId === +sessionUser.id)
    useEffect(() => {
        dispatch(reviewActions.getUserReviews(sessionUser.id))
    }, [dispatch, sessionUser])
    return (
        <div>
            <ul>
            {finalArr.map(review => (<li key={review.id}>{review.review}, {review.stars}</li>))}
        
            </ul>
        </div>
    )
}

export default CurrentUsersReviews;
