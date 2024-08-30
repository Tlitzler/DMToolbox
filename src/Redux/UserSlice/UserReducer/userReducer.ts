import { createReducer } from '@reduxjs/toolkit';
import { IUserObject } from '../../Types/user';
import { fetchUserThunk } from '../../../Pages/Login/thunks/fetchUserThunk';
import { authenticateThunk } from '../../../Pages/Login/thunks/authenticateThunk';


interface IUserSlice {
  authenticated: boolean;
  userObject: IUserObject;
};

const initialState: IUserSlice = {
  authenticated: false,
  userObject: {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    id: 0,
  },
}

export const userReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      state.userObject = action.payload;
    });
    builder.addCase(authenticateThunk.fulfilled, (state, action) => {
      state.userObject = action.payload;
      state.authenticated = true;
    });
  }
);