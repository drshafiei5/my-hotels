import { configureStore } from '@reduxjs/toolkit'
import bookingsReducer from './bookings'
import likesReducer from './likes'
import reviewsReducer from './reviews'
import roomsReducer from './rooms'
import usersReducer from './users'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        rooms: roomsReducer,
        reviews: reviewsReducer,
        bookings: bookingsReducer,
        likes: likesReducer,
    },
})

