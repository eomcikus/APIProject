import { csrfFetch } from "./csrf";


const LOAD = '/bookings/LOAD'
const USER = '/bookings/USER'
const CREATE = '/bookings/NEW'
const UPDATE = '/bookings/UPDATE'
const REMOVE = '/bookings/REMOVE'

const load = bookings => ({
    type: USER,
    bookings
})

const loadSpotBook = bookings => ({
    type: LOAD,
    bookings
})

const create = booking => ({
    type: CREATE,
    booking
})

const update = booking => ({
    type: UPDATE,
    booking
})

const remove = bookingId => ({
    type: REMOVE,
    bookingId
})

//thunks
export const getUserBookings = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`)
    if (response.ok){
        const data = await response.json()
        dispatch(load(data.Bookings))
    }
}
//get bookings for spot
export const getSpotBookings = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/${spotId}/bookings`)
    if (response.ok){
        const data = await response.json()
        dispatch(loadSpotBook(data.Bookings))
    }
}
export const addBooking = ( booking, spotId) => async (dispatch)=> {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        body: JSON.stringify(booking),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok){
        const newBooking = await response.json()
        console.log('-----------------------', newBooking)
        dispatch(create(newBooking))
        return newBooking;
    }
}
let initialState = {}
const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case USER: {
            newState = {...state, bookings: {}}
            console.log('action.bookings', action.bookings)
            newState.bookings = {}
            action.bookings.forEach(booking => {
                newState.bookings[booking.id] = booking
            })
            return newState;
        }
        case LOAD: {
            newState = {...state, bookings: {}}
            action.bookings.forEach(booking => {
                newState.bookings[booking.id] = booking
            })
            return newState;
        }
        case CREATE: {
            newState = {...state, bookings: {...state.bookings}}
            newState.bookings[action.booking.id] = action.booking
            return newState;
        }
        default: 
            return state;
    }
}
export default bookingsReducer