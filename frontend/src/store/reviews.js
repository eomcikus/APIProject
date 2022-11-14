import { csrfFetch } from "./csrf";
//types
const LOAD = '/reviews/LOAD'
const USER = '/reviews/USER'
const CREATE = '/reviews/NEW'
const REMOVE = '/reviews/REMOVE'

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

//thunks 

export const getReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const data = await response.json()
        console.log('--reviews in thunk', data)
        dispatch(load(data.Reviews))
        // console.log('...after dispatch', reviews)
        // return reviews;
    }    else {
        console.log('debugging')
    }
    
}

export const getUserReviews = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/current`)
    console.log('getUserRes', response)
    if (response.ok) {
        const data = await response.json()
        console.log('---data after .json', data)
        dispatch(viewUserRevs(data.Reviews))
    }
}

export const createReview = (review, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const review = await response.json()
        console.log('in response')
        dispatch(create(review))
        console.log('---review after dispatch', review)
        return review;
    }
}

export const removeReview = (reviewId) => async dispatch => {
    console.log('were in the thunk at least', reviewId)
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    console.log('---response in removereview', response)
    if (response.ok) {
        // const review = await response.json()
        // console.log('response', response)
        dispatch(remove(reviewId))
    }
}

let initialState = {

    spot: {},
    user: {}

}

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD: {
            newState = { ...state, spot: {...state.spot}, user: {...state.user} }
            action.reviews.forEach(review => {
                newState.spot[review.id] = review
            })
            console.log(action.reviews)
            if (!action.reviews) {
                return state.reviews;
            } else {
            return newState;
            }
        }
        case USER: {
            newState = { ...state, user: {...state.user} }
            console.log('action.reviews', action)
            action.userId.forEach(review => {
                newState.user[review.id] = review
            })
            return newState;
        }
        case CREATE: {
            newState = { ...state, Spot: { ...state.spot }, User: { ...state.user } }
            console.log('action.review', action.review)
            newState.spot[action.review.id] = action.review
            newState.user[action.review.id] = action.review
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
            newState = { ...state, spot: {...state.spot}, user: {...state.user} }
            delete newState.user[action.reviewId]
            delete newState.spot[action.reviewId]
          
            return newState
        }
        default:
            return state;
    }
}
export default reviewReducer;