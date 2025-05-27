import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateHazard } from '../api/updateHazardAPI';
import { IHazardObject } from '../../Types/campaign';
import { selectUserId } from '../../UserSlice/userSelectors';
import { RootState } from '../../store';

export const updateHazardThunk = createAsyncThunk(
    'campaign/updateHazard',
    async (hazard: IHazardObject, { getState }) => {
        const state = getState() as RootState;
        const userId = selectUserId(state);
        if (userId === undefined) {
            throw new Error('User is not logged in');
        }

        const updatedHazard = await updateHazard(hazard) as IHazardObject;

        return updatedHazard;
    }
);