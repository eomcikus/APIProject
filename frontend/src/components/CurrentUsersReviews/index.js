import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getUserReviews} from "../../store/reviews";
import RemoveReview from '../RemoveReview';
import EditReviewModal from '../EditReview.js'



const CurrentUsersReviews = () => {
    const dispatch = useDispatch()
    const [reviews, setReviews] = useState([])
    // console.log('get the reviews', reviews)
    const sessionUser = useSelector(state => state.session.user)
    // console.log('current user', sessionUser)
    // const finalArr = reviews.filter(review => +review.userId == +sessionUser.id)
    // console.log('final arr', finalArr)
    useEffect( async () => {
        const userReviews = await dispatch(getUserReviews())
        setReviews(userReviews.filter(review => +review.userId == +sessionUser.id))
    }, [dispatch, sessionUser])
    return (
        <div>
            <ul>
            {reviews.map(review => (<li key={review.id}>{review.review}, {review.stars}<EditReviewModal review={review}/><RemoveReview review={review}/>  </li>))}
            {reviews.map(review => review.userId === sessionUser.id && (
                <>
                {/* <EditReview review={review}/> */}
                {/* <RemoveReview review={review}/> */}
                </>
            ))}
            </ul>
        </div>
    )
}

export default CurrentUsersReviews;
