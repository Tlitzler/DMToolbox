import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateMap } from "../api/updateMapAPI";
import { IMapObject } from "../../Types/campaign";
import { selectUserId } from "../../UserSlice/userSelectors";
import { RootState } from "../../store";

export const updateMapThunk = createAsyncThunk(
    "campaign/updateMap",
    async (map: IMapObject, { getState }) => {
        const state = getState() as RootState;
        const userId = selectUserId(state);
        if (userId === undefined) {
            throw new Error("User is not logged in");
        }
        const newMap = await updateMap(map) as IMapObject;

        return newMap;
    }
);