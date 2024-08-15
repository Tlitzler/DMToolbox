import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { fetchUserAPI } from '../api/fetchUserAPI';

export const fetchUserThunk = createAsyncThunk(
  'user/fetchUser',
  async (email: string) => {
    const response = await fetchUserAPI(email) as AxiosResponse;
    return response.data;
  }
);