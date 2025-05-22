import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteItem } from "../api/deleteItemAPI";
import { IItemObject } from "../../Types/campaign";
import { selectUserId } from "../../UserSlice/userSelectors";
import { selectSelectedCampaignId } from "../campaignSelectors";
import { RootState } from "../../store";

export const deleteItemThunk = createAsyncThunk(
    "campaign/deleteItem",
    async (itemId: number, { getState }) => {
        const state = getState() as RootState;
        const userId = selectUserId(state);
        const campaignId = selectSelectedCampaignId(state);
        if (userId === undefined) {
            throw new Error("User is not logged in");
        }
        const deletedItem = await deleteItem(itemId, campaignId) as IItemObject;

        return deletedItem;
    }
);