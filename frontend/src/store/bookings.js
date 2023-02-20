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
    // console.log('is this even being called tho')
    const response = await csrfFetch(`/api/bookings/current`)
    if (response.ok){
        const data = await response.json()
        // console.log('data =========================', data)
        dispatch(load(data.Bookings))
    }
}
//get bookings for spot
export const getSpotBookings = (spotId) => async (dispatch) => {
    // console.log('hello?')
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
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
        // console.log('-----------------------', newBooking)
        dispatch(create(newBooking))
        return newBooking;
    }
}

export const deleteBooking = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })
    if (response.ok){
        dispatch(remove(bookingId))
    }
}

export const editBooking = (booking, bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        body: JSON.stringify(booking),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok){
        const booking = await response.json()
        dispatch(update(booking))
        return
    } 
}
let initialState = {}
const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case USER: {
            newState = {...state}

            action.bookings.forEach(booking => {
                newState[booking.id] = booking
            })
            return newState;
        }
        case LOAD: {
            newState = {...state}
            action.bookings.forEach(booking => {
                newState[booking.id] = booking
            })
            return newState;
        }
        case CREATE: {
            newState = {...state}
            // console.log('action.booking', action)
            newState[action.booking.id] = action.booking
            return newState;
        }
        case REMOVE: {
            newState = {...state}
            delete newState[action.bookingId]
            return newState;
        }
        case UPDATE: {
            newState = {...state}
            newState[action.booking.id] = action.booking
            return newState;
        }
        default: 
            return state;
    }
}
export default bookingsReducer