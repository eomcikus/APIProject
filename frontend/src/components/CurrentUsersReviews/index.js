import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getUserReviews} from "../../store/reviews";
import RemoveReview from '../RemoveReview';
import EditReview from '../EditReview.js/EditReview';



const CurrentUsersReviews = () => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviews['user'])
    console.log('get the reviews', reviews)
    const sessionUser = useSelector(state => state.session.user)
    // console.log('current user', sessionUser)
    const finalArr = reviews.filter(review => +review.userId == +sessionUser.id)
    // console.log('final arr', finalArr)
    useEffect(() => {
        dispatch(getUserReviews())
    }, [dispatch, sessionUser])
    return (
        <div>
            <ul>
            {finalArr.map(review => (<li key={review.id}>{review.review}, {review.stars}<EditReview review={review}/><RemoveReview review={review}/></li>))}
            {finalArr.map(review => review.userId === sessionUser.id && (
                <>
                {/* <EditReview review={review}/> */}
                <RemoveReview review={review}/>
                </>
            ))}
            </ul>
        </div>
    )
}

export default CurrentUsersReviews;
