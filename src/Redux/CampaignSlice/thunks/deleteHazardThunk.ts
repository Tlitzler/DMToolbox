import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteHazard } from "../api/deleteHazardAPI";
import { IHazardObject } from "../../Types/campaign";
import { selectUserId } from "../../UserSlice/userSelectors";
import { selectSelectedCampaignId } from "../campaignSelectors";
import { RootState } from "../../store";

export const deleteHazardThunk = createAsyncThunk(
    "campaign/deleteHazard",
    async (hazardId: number, { getState }) => {
        const state = getState() as RootState;
        const userId = selectUserId(state);
        const campaignId = selectSelectedCampaignId(state);
        if (userId === undefined) {
            throw new Error("User is not logged in");
        }
        const deletedHazard = await deleteHazard(hazardId, campaignId) as IHazardObject;

        return deletedHazard;
    }
);