import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { createReview } from '../../store/reviews';

const EditReview = ({ review, setShowModal }) => {
    const dispatch = useDispatch()
    const history= useHistory()
    const user = useSelector(state => state.session.userId)
    const reviews = useSelector(state => state.reviews)
    console.log('reviews --------', reviews)
    console.log('review passed in-----', review)
    let userReview;
    userReview = reviews.find(review => +review.userId === +user)
    if (userReview){
        
    }
    const [reviewtext, setReviewtext] = useState(review?.review)
    const [stars, setStars] = useState(review?.stars)
    const [submit, setSubmit] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    useEffect(() => {
        setReviewtext(review?.review)
        setStars(review?.stars)
    }, [dispatch])
    const cancel = async (e) => {
        setShowModal(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            id: review.id,
            reviewtext,
            stars,
            spotId: review.spotId,
            userId: review.userId
        }
        setSubmit(true)
        let updatedReview = await dispatch(createReview)
        if (updatedReview) return history.push(`/spots/${payload.spotId}`)
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