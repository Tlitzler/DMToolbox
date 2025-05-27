import { createAsyncThunk } from "@reduxjs/toolkit";
import { addHazard } from "../api/addHazardAPI";
import { IHazardObject } from "../../Types/campaign";
import { selectUserId } from "../../UserSlice/userSelectors";
import { selectSelectedCampaignId } from "../campaignSelectors";
import { RootState } from "../../store";

export const addHazardThunk = createAsyncThunk(
    "campaign/addHazard",
    async (hazard: IHazardObject, { getState }) => {
        const state = getState() as RootState;
        const userId = selectUserId(state);
        const campaignId = selectSelectedCampaignId(state);
        if (userId === undefined) {
            throw new Error("User is not logged in");
        }

        return await addHazard(hazard, userId, campaignId) as IHazardObject;
    }
);