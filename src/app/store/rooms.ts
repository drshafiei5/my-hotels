import { AxiosError } from 'axios';
import { RoomType, BookingType } from './../types/types';
import { createAction, createSlice } from '@reduxjs/toolkit';
import roomsService from '../services/rooms.service';

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    entities: [] as Array<RoomType>,
    filteredEntities: [] as Array<RoomType>,
    isLoading: true as boolean,
    error: null as string | null,
  },
  reducers: {
    roomsRequested: state => {
      state.isLoading = true;
    },
    roomsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    filteredRoomsReceived: (state, action) => {
      state.filteredEntities = action.payload;
      state.isLoading = false;
    },
    roomsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    roomUpdated: (state, action) => {
      const roomIndex = state.entities.findIndex(room => room._id === action.payload._id);
      state.entities[roomIndex] = action.payload;
    },
  },
});

const { actions, reducer: roomsReducer } = roomsSlice;

const { roomsRequested, roomsReceived, roomsRequestFailed, roomUpdated, filteredRoomsReceived } = actions;

const addBookingRoomRequested = createAction('rooms/addBookingRoomRequested');
const addBookingRoomRequestedSuccess = createAction('rooms/addBookingRoomRequestedSuccess');
const addBookingRoomRequestedFailed = createAction('rooms/addBookingRoomRequestedFailed');

const removeBookingRoomRequested = createAction('rooms/removeBookingRoomRequested');
const removeBookingRoomRequestedSuccess = createAction('rooms/removeBookingRoomRequestedSuccess');
const removeBookingRoomRequestedFailed = createAction('rooms/removeBookingRoomRequestedFailed');

const roomUpdateRequested = createAction('rooms/roomUpdateRequested');
const roomUpdateRequestedFailed = createAction('rooms/roomUpdateRequestedFailed');

export const loadRoomsList = () => async (dispatch: any) => {
  dispatch(roomsRequested());
  try {
    const { content } = await roomsService.getAll();
    dispatch(roomsReceived(content || []));
  } catch (error) {
    const err = error as AxiosError;
    dispatch(roomsRequestFailed(err.message));
  }
};

export const loadFilteredRoomsList = (queryParams?: any) => async (dispatch: any) => {
  dispatch(roomsRequested());
  try {
    const { content } = await roomsService.getAll(queryParams);
    dispatch(filteredRoomsReceived(content || []));
  } catch (error) {
    const err = error as AxiosError;
    dispatch(roomsRequestFailed(err.message));
  }
};

export const addBookingRoom =
  (payload: BookingType) =>
    async (dispatch: any) => {
      dispatch(addBookingRoomRequested());
      try {
        roomsService.setBooking(payload);
        dispatch(addBookingRoomRequestedSuccess());
      } catch (error) {
        dispatch(addBookingRoomRequestedFailed());
      }
    };

export const removeBookingRoom =
  (payload: { roomId: string; _id: string }) =>
    async (dispatch: any) => {
      dispatch(removeBookingRoomRequested());
      try {
        roomsService.deleteBooking(payload);
        dispatch(removeBookingRoomRequestedSuccess());
      } catch (error) {
        dispatch(removeBookingRoomRequestedFailed());
      }
    };

export const updateRoomData =
  (payload: RoomType) =>
    async (dispatch: any) => {
      dispatch(roomUpdateRequested());
      try {
        const { content } = await roomsService.update(payload);
        dispatch(roomUpdated(content));
      } catch (error) {
        dispatch(roomUpdateRequestedFailed());
      }
    };

export const getRooms = () => (state: any) => state.rooms.entities;
export const getFilteredRooms = () => (state: any) => state.rooms.filteredEntities;
export const getRoomsLoadingStatus = () => (state: any) => state.rooms.isLoading;
export const getRoomById = (roomId: string) => (state: any) => {
  if (state.rooms.entities) {
    return state.rooms.entities.find((room: any) => room._id === roomId);
  }
};

export const getRoomsByIds = (roomsIds: string[]) => (state: any) => {
  if (state.rooms.entities) {
    return state.rooms.entities.filter((room: any) => (roomsIds.length > 0 ? roomsIds.includes(room._id || '') : false));
  }
  return [];
};

export default roomsReducer;