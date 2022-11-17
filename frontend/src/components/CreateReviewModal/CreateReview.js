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
            <form onSubmit={handleSubmit}>
                Stars:
                {submit && !!validationErrors.length && (
                    <ul className="errors">
                        {validationErrors.map((error) => (
                            <li key={error}>{error}</li>))}
                    </ul>
                )}
                <input
                    type="number"
                    placeholder="Rate your stay"
                    min={1}
                    max={5}
                    // required
                    value={stars}
                    onChange={e => {
                        // setValidationErrors([])
                        setStars(e.target.value)
                    }}
                />
                Review:
                <input
                    type="text"
                    placeholder="Tell us about it"
                    required
                    value={review}
                    onChange={e => setReview(e.target.value)} />
                <button type="submit">Create new Review</button>
                <button type="button" onClick={resetClick}>Cancel</button>
            </form>
        </section>
    )
}

export default CreateReviewForm;