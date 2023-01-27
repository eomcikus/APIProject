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


let initialState = {}
const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case USER: {
            newState.bookings.forEach(booking => {
                newState.bookings[booking.id] = booking
            })
        }
        default: 
            return state;
    }
}