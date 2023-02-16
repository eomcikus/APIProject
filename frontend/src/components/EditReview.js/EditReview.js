import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { createReview, editReview, getReviews, getUserReviews } from '../../store/reviews';
import { getSingleSpot } from '../../store/spots';
const EditReview = ({ setShowModal, review }) => {
    const dispatch = useDispatch()
    const history= useHistory()
    // const reviewId = useParams()

    const user = useSelector(state => state.session.user)
    // console.log(user)
    const reviews = useSelector(state => state.reviews.reviews)
    const reviewsArr = Object.values(reviews)
    const [loading, setLoading] = useState(false)
    // console.log(reviewsArr[0])
    // console.log('reviews --------', reviews)
    console.log('review passed in-----', review)
//     let userReview;
//     let reviewId;
    // if (user) {
    // userReview = reviewsArr.find(review => +review.userId == +user.id)
    // reviewId = userReview.id
    // }
// console.log('-----------------', userReview)
    const [reviewtext, setReviewtext] = useState(review.review)
    const [stars, setStars] = useState(review.stars)
    const [submit, setSubmit] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    useEffect(() => {
        setReviewtext(review.review)
        setStars(review.stars)
    }, [dispatch, review, loading])
    const cancel = async (e) => {
        setShowModal(false)
    }
    const handleSubmit = async (e) => {
        // console.log('heeeere')
        e.preventDefault()
        const payload = {
            id: review.id,
            review: reviewtext,
            stars: stars,
            spotId: review.spotId,
            userId: review.userId
        }
        setSubmit(true)
        setLoading(true)
        let updatedReview = await dispatch(editReview(payload, review.id, user))
        console.log('here')
        if (updatedReview) {
             dispatch(getSingleSpot(payload.spotId))
             dispatch(getUserReviews())
             setLoading(false)
             setShowModal(false)
             
            // return history.push(`/spots/${payload.spotId}`)
        }
    }


    return (
        <>
            <div className='review-layout'>
                <form onSubmit={handleSubmit}>
                    {submit && !!validationErrors.length && (
                        <ul className='errors'>
                            {validationErrors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                    <input type='text'
                        value={reviewtext}
                        onChange={e => setReviewtext(e.target.value)}
                        className='review-edit' />
                    <input
                        type='number'
                        min={1}
                        max={5}
                        value={stars}
                        onChange={e => setStars(e.target.value)}
                        className='stars-input' />
                    <button type='submit-review-edit' className='edit-review' >Edit Review</button>
                </form>
            </div>
        </>
    )
}
export default EditReview