import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { authenticateAPI } from '../../../Redux/UserSlice/api/authenticateAPI';

export const authenticateThunk = createAsyncThunk(
  'user/authenticate',
  async (params: {email: string; password: string;}) => {
    const response = await authenticateAPI(params) as AxiosResponse;
    return response.data;
  }
);