import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateItem } from "../api/updateItemAPI";
import { IItemObject } from "../../Types/campaign";
import { selectUserId } from "../../UserSlice/userSelectors";
import { RootState } from "../../store";

export const updateItemThunk = createAsyncThunk(
    "campaign/updateItem",
    async (item: IItemObject, { getState }) => {
        const state = getState() as RootState;
        const userId = selectUserId(state);
        if (userId === undefined) {
            throw new Error("User is not logged in");
        }
        
        const newItem = await updateItem(item) as IItemObject;

        return newItem;
    }
);