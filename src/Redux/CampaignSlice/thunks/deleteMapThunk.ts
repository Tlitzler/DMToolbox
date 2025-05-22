import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteMap } from "../api/deleteMapAPI";
import { IMapObject } from "../../Types/campaign";
import { selectUserId } from "../../UserSlice/userSelectors";
import { selectSelectedCampaignId } from "../campaignSelectors";
import { RootState } from "../../store";

export const deleteMapThunk = createAsyncThunk(
    "campaign/deleteMap",
    async (mapId: number, { getState }) => {
        const state = getState() as RootState;
        const userId = selectUserId(state);
        const campaignId = selectSelectedCampaignId(state);
        if (userId === undefined) {
            throw new Error("User is not logged in");
        }
        const deletedMap = await deleteMap(mapId, campaignId) as IMapObject;

        return deletedMap;
    }
);