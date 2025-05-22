import { createAsyncThunk } from "@reduxjs/toolkit";
import { addItem } from "../api/addItemAPI";
import { IItemObject } from "../../Types/campaign";
import { selectUserId } from "../../UserSlice/userSelectors";
import { selectSelectedCampaignId } from "../campaignSelectors";
import { RootState } from "../../store";

export const addItemThunk = createAsyncThunk(
    "campaign/addItem",
    async (item: IItemObject, { getState }) => {
        const state = getState() as RootState;
        const userId = selectUserId(state);
        const campaignId = selectSelectedCampaignId(state);
        if (userId === undefined) {
            throw new Error("User is not logged in");
        }

        return await addItem(item, userId, campaignId) as IItemObject;
    }
);