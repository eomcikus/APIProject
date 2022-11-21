import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import * as reviewActions from "../../store/reviews"
import { getSingleSpot } from "../../store/spots";
import './CreateReview.css';

const CreateReviewForm = ({setShowModal}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [submit, setSubmit] = useState(false)
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user)

    const resetClick = (e) => {
        e.preventDefault()
        setReview('')
        setStars('')
    }
    const cancel =  async (e) => {
        setShowModal(false)
    }
useEffect(() =>{
let errors = []
if (review.length < 20) errors.push('Review must be longer than 20 characters')
setValidationErrors(errors)
}, [review])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            review,
            stars
        }
        setSubmit(true)
        if (validationErrors.length){
            setShowModal(true)
        } else {
        let createdReview = await dispatch(reviewActions.createReview(payload, spotId, sessionUser))
        if (createdReview){
            // console.log('createdReview', createdReview)
            dispatch(reviewActions.getReviews(spotId))
            dispatch(getSingleSpot(spotId))
            setShowModal(false)
            history.push(`/spots/${spotId}`)
        } 
        }
        // console.log(createdReview)
    }
    return (
        <section>
            <form onSubmit={handleSubmit} className='review-modal'>
         
                {submit && !!validationErrors.length && (
                    <ul className="errors">
                        {validationErrors.map((error) => (
                            <li key={error}>{error}</li>))}
                    </ul>
                )}
                <input
                    type="number"
                    placeholder="Stars"
                    min={1}
                    max={5}
                    // required
                    value={stars}
                    className='review-stars'
                    onChange={e => {
                        // setValidationErrors([])
                        setStars(e.target.value)
                    }}
                />
                
                <input
                    type="text"
                    placeholder="Write your review here"
                    required
                    value={review}
                    className='review-text'
                    onChange={e => setReview(e.target.value)} />
                <button type="submit">Create new Review</button>
                <button type="button" onClick={cancel}>Cancel</button>
            </form>
        </section>
    )
}

export default CreateReviewForm;