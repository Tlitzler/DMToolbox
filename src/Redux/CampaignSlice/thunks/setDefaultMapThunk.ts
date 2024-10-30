import { createAsyncThunk } from "@reduxjs/toolkit";
import { setDefaultMap } from "../api/setDefaultMapAPI";

export const setDefaultMapThunk = createAsyncThunk(
    "campaign/setDefaultMap",
    async ({defaultMapId, campaignId}: {defaultMapId: number, campaignId: number}) => {
        const response = await setDefaultMap(defaultMapId, campaignId);
        return response;
    }
);