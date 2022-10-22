import { AxiosError } from 'axios';
import { createAction, createSlice } from '@reduxjs/toolkit';
import bookingService from '../services/booking.service';
import isOutDated from '../utils/isOutDated';
import { BookingType, IResponse } from './../types/types';

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    entities: [] as Array<BookingType>,
    isLoading: true as boolean,
    createBookingLoading: false as boolean,
    error: null as string | null,
    lastFetch: null as number | null,
  },
  reducers: {
    bookingsRequested: state => {
      state.isLoading = true;
    },
    bookingsReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    bookingsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    bookingCreateRequested: state => {
      state.error = null;
      state.createBookingLoading = true;
    },
    bookingCreateRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.createBookingLoading = false;
    },
    bookingCreated: (state, action) => {
      state.entities.push(action.payload);
      state.error = null;
      state.createBookingLoading = false;
    },
    bookingRemoved: (state, action) => {
      state.entities = state.entities.filter(booking => booking._id !== action.payload);
      state.error = null;
    },
  },
});

const { actions, reducer: bookingsReducer } = bookingsSlice;

const {
  bookingsRequested,
  bookingsReceived,
  bookingsRequestFailed,
  bookingCreated,
  bookingRemoved,
  bookingCreateRequested,
  bookingCreateRequestedFailed,
} = actions;

const removeBookingRequested = createAction('bookings/removeBookingRequested');
const removeBookingRequestedFailed = createAction('bookings/removeBookingRequestedFailed');

export const loadBookingsList = () => async (dispatch: any, getState: any) => {
  // if 10 min is spent send booking list request
  const { lastFetch } = getState().bookings;
  if (isOutDated(Number(lastFetch))) {
    dispatch(bookingsRequested());
    try {
      const { content } = await bookingService.getAll();
      dispatch(bookingsReceived(content || []));
    } catch (error: any) {
      dispatch(bookingsRequestFailed(error.message));
    }
  }
};

export const createBooking =
  (payload: BookingType) =>
    async (dispatch: any) => {
      dispatch(bookingCreateRequested());
      try {
        const { content } = await bookingService.create(payload);
        dispatch(bookingCreated(content));
        return content;
      } catch (error) {
        const err = error as AxiosError;
        const resError = err.response?.data as IResponse;
        const msg = !!resError?.message ? resError?.message : resError.error.message;

        if (err.response?.status === 500) {
          dispatch(bookingCreateRequestedFailed(msg));
          return;
        }

        console.log(resError.message);
        dispatch(bookingCreateRequestedFailed(msg));
      }
    };

export const removeBooking =
  (bookingId?: string) =>
    async (dispatch: any) => {
      dispatch(removeBookingRequested());
      try {
        const id = await bookingService.remove(bookingId || '');
        dispatch(bookingRemoved(id));
      } catch (error) {
        dispatch(removeBookingRequestedFailed());
      }
    };

export const getBookings = () => (state: any) => state.bookings.entities;
export const getBookingsLoadingStatus = () => (state: any) => state.bookings.isLoading;
export const getBookingCreatedStatus = () => (state: any) => state.bookings.createBookingLoading;
export const getBookingsByUserId = (userId: string) => (state: any) => {
  if (state.bookings.entities) {
    return state.bookings.entities.filter((booking: any) => booking.userId === userId);
  }
  return [];
};
export const getBookingsByRoomId = (roomId: string) => (state: any) => {
  if (state.bookings.entities) {
    return state.bookings.entities.filter((booking: any) => booking.roomId === roomId);
  }
  return [];
};

export const getBookingsErrors = () => (state: any) => state.bookings.error;

export default bookingsReducer;
