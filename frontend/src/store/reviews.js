import { csrfFetch } from "./csrf";
//types
const LOAD = '/reviews/LOAD'
const USER = '/reviews/USER'
const CREATE = '/reviews/NEW'
const REMOVE = '/reviews/REMOVE'
const UPDATE = '/reviews/UPDATE'
//actions
const load = reviews => ({
    type: LOAD,
    reviews
})

const viewUserRevs = userId => ({
    type: USER,
    userId
})

const create = review => ({
    type: CREATE,
    review
})

const remove = reviewId => ({
    type: REMOVE,
    reviewId
})

const update = review => ({
    type: UPDATE,
    review
})

//thunks 

export const getReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const data = await response.json()
        // console.log('--reviews in thunk', data)
        dispatch(load(data.Reviews))
        // console.log('...after dispatch', data.Reviews)
        // return reviews;
    }    else {
        return null;
    }
    
}

export const getUserReviews = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/current`)
    // console.log('getUserRes', response)
    if (response.ok) {
        const data = await response.json()
        // console.log('---data after .json', data)
        dispatch(viewUserRevs(data.Reviews))
        return data.Reviews
    }
}

export const createReview = (review, spotId, user) => async dispatch => {
    // console.log('user', user)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const review = await response.json()
        review.User = user
        // review.User['userPhoto'] = user.userPhoto
        // console.log('in response', review)
        dispatch(create(review))
        // console.log('---review after dispatch', review)
        return review;
    }
}
export const editReview = (review, reviewId, user) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify(review),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok){
        const review = await response.json()
        // console.log('review in thunk', review)
        // review.User = user
        dispatch(update(review))
        return review
    }
}
export const removeReview = (reviewId) => async dispatch => {
    // console.log('were in the thunk at least', reviewId)
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    // console.log('---response in removereview', response)
    if (response.ok) {
        // const review = await response.json()
        // console.log('response', response)
        dispatch(remove(reviewId))
    }
}

let initialState = {

    reviews: {}

}

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD: {
            newState = { ...state, reviews: {}}
            // console.log('action.reviews load', action.reviews)
            action.reviews.forEach(review => {
                newState.reviews[review.id] = review
            })
            // console.log(action.reviews)
            if (!action.reviews) {
                return state.reviews;
            } else {
            return newState;
            }
        }
        case USER: {
            newState = {  ...state, user: {...state} }

            action.userId.forEach(review => {
                newState.user[review.id] = review
            })
            newState.user = action.userId
            return newState;
        }
        case CREATE: {
            newState = { ...state }
            // console.log('action.review', action.review)
            // newState.Spot[action.review.spotId]
            newState.reviews[action.review.spotId] = action.review
            // newState.User[action.review.id] = action.review

            return newState;
        }
        // case REMOVE: {
        //     newState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
        //     delete newState.user[action.reviewId]
        //     delete newState.spot[action.reviewId]
        //     console.log(newState.user)
        //     return newState
        // }
        case REMOVE: {
            newState = { ...state }
            delete newState.reviews[action.reviewId]
            return newState
        }
        case UPDATE: {
            newState = { ...state, reviews: {...state.reviews} }
            // console.log('NEWSTATE', newState)
            // console.log('action reviewid', action.review)
            newState.reviews[action.review.id] = action.review
            newState.user[action.review.id] = action.review
            return newState
        }
        default:
            return state;
    }
}
export default reviewReducer;