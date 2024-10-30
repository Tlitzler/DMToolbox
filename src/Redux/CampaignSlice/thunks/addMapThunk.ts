import { createAsyncThunk } from "@reduxjs/toolkit";
import { addMap } from "../api/addMapAPI";
import { IMapObject } from "../../Types/campaign";
import { selectUserId } from "../../UserSlice/userSelectors";
import { selectDefaultMapId, selectSelectedCampaignId } from "../campaignSelectors";
import { setDefaultMapThunk } from "./setDefaultMapThunk";
import { RootState } from "../../store";

export const addMapThunk = createAsyncThunk(
    "campaign/addMap",
    async (map: IMapObject, { getState, dispatch }) => {
        const state = getState() as RootState;
        const userId = selectUserId(state);
        const campaignId = selectSelectedCampaignId(state);
        const defaultMapId = selectDefaultMapId(state);
        if (userId === undefined) {
            throw new Error("User is not logged in");
        }
        const newMap = await addMap(map, userId, campaignId) as IMapObject;
        if (defaultMapId === null) {
            dispatch(setDefaultMapThunk({defaultMapId: newMap.id, campaignId: campaignId}));
        }
        return newMap;
    }
);