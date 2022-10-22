import { createSlice, createAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import authService from '../services/auth.service';
import { UserType, SignInDataType, IResponse } from './../types/types';
import localStorageService, { setTokens } from '../services/localStorage.service';
import generateAuthError from '../utils/AuthErrors';
import userService from '../services/user.service';

type UserInitialState = {
  entities: Array<UserType>;
  isLoading: boolean;
  error: string | null;
  auth: {
    userId: string | null;
  };
  isLoggedIn: boolean;
  dataLoaded: boolean;
};


const initialState: UserInitialState = localStorageService.getAccessToken()
  ? {
    entities: [],
    isLoading: false,
    error: null,
    auth: { userId: localStorageService.getUserId() },
    isLoggedIn: true,
    dataLoaded: false,
  }
  : {
    entities: [],
    isLoading: false,
    error: null,
    auth: { userId: null },
    isLoggedIn: false,
    dataLoaded: false,
  };

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    usersRequested: state => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequested: state => {
      state.error = null;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userUpdated: (state, action) => {
      const userIndex = state.entities.findIndex(user => user._id === action.payload._id);
      state.entities[userIndex] = action.payload;
    },
    userLoggedOut: state => {
      state.isLoggedIn = false;
      state.auth.userId = null;
    },
  },
});

const { actions, reducer: usersReducer } = usersSlice;

const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequested,
  authRequestSuccess,
  authRequestFailed,
  userUpdated,
  userLoggedOut,
} = actions;

const userUpdateRequested = createAction('users/userUpdateRequested');
const userUpdateRequestedFailed = createAction('users/userUpdateRequestedFailed');

export const updateUserData =
  (payload: UserType) =>
    async (dispatch: any) => {
      dispatch(userUpdateRequested());
      try {
        const { content } = await userService.updateUserData(payload);
        dispatch(userUpdated(content));
      } catch (error) {
        dispatch(userUpdateRequestedFailed());
      }
    };


export const signIn = ({ payload }: { payload: SignInDataType; }) =>
  async (dispatch: any) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.signIn({ email, password });
      setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
    } catch (error) {
      const err = error as AxiosError;
      const { error: resError } = err.response?.data as { error: IResponse };
      const { code, message } = resError;
      if (code === 400) {
        const errorMessage = generateAuthError(String(message));
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(message));
      }
    }
  };

export const signUp =
  (payload: UserType) =>
    async (dispatch: any) => {
      dispatch(authRequested());
      try {
        const data = await authService.signUp(payload);
        setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
      } catch (error) {
        const err = error as AxiosError;
        dispatch(authRequestFailed(err.message));
      }
    };

export const logOut = () => async (dispatch: any) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
};

export const loadUsersList = () => async (dispatch: any) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.getAll();
    dispatch(usersReceived(content));
  } catch (error) {
    const err = error as AxiosError;
    dispatch(usersRequestFailed(err.message));
  }
};

export const getUsersList = () => (state: any) => state.users.entities;

export const getCurrentUserData = () => (state: any) => {
  if (state.users.auth?.userId) {
    return state.users.entities.length > 0
      ? state.users.entities.find((user: UserType) => user._id === state.users.auth.userId)
      : null;
  }
};

export const getUsersLoadingStatus = () => (state: any) => state.users.isLoading;

export const getUserById = (userId: string) => (state: any) => {
  if (state.users.entities) {
    return state.users.entities.find((user: UserType) => user._id === userId);
  }
};

export const getIsLoggedIn = () => (state: any) => state.users.isLoggedIn;

export const getDataStatus = () => (state: any) => state.users.dataLoaded;
export const getCurrentUserId = () => (state: any) => {
  return state.users.auth.userId;
};

export const getAuthErrors = () => (state: any) => state.users.error;

export default usersReducer;
