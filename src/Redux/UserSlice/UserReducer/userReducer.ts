import { createReducer } from '@reduxjs/toolkit';
import { IUserObject } from '../../Types/user';
import { fetchUserThunk } from '../../../Pages/Login/thunks/fetchUserThunk';
import { authenticateThunk } from '../../../Pages/Login/thunks/authenticateThunk';
import { logout } from '../actions/logout';

interface IUserSlice {
    authenticated: boolean;
    userObject: IUserObject;
};

const emptyUser = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    id: 0,
};

const initialState: IUserSlice = {
    authenticated: false,
    userObject: {...emptyUser},
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
        builder.addCase(logout, (state) => {
            state.authenticated = false;
            state.userObject = {...emptyUser};
        });
    }
);