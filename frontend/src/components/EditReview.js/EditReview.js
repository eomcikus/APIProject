import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { createReview, editReview, getReviews } from '../../store/reviews';
import { getSingleSpot } from '../../store/spots';
const EditReview = ({ setShowModal }) => {
    const dispatch = useDispatch()
    const history= useHistory()
    // const reviewId = useParams()

    const user = useSelector(state => state.session.user)
    // console.log(user)
    const reviews = useSelector(state => state.reviews.reviews)
    const reviewsArr = Object.values(reviews)
    // console.log(reviewsArr)
    // console.log('reviews --------', reviews)
    // console.log('review passed in-----', review)
    let userReview;
    if (user) {
    userReview = reviewsArr.find(review => +review.userId == +user.id)
    }
    let reviewId = userReview.id
// console.log('-----------------', userReview)
    const [reviewtext, setReviewtext] = useState(userReview?.review)
    const [stars, setStars] = useState(userReview?.stars)
    const [submit, setSubmit] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    useEffect(() => {
        setReviewtext(userReview?.review)
        setStars(userReview?.stars)
    }, [dispatch])
    const cancel = async (e) => {
        setShowModal(false)
    }
    const handleSubmit = async (e) => {
        // console.log('heeeere')
        e.preventDefault()
        const payload = {
            id: userReview.id,
            review: reviewtext,
            stars: stars,
            spotId: userReview.spotId,
            userId: userReview.userId
        }
        setSubmit(true)
        let updatedReview = await dispatch(editReview(payload, reviewId, user))
        if (updatedReview) {
            await dispatch(getSingleSpot(payload.spotId))
            setShowModal(false)
            return history.push(`/spots/${payload.spotId}`)
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
                    <button type='submit-review-edit' className='edit-review'>Edit Review</button>
                </form>
            </div>
        </>
    )
}
export default EditReview