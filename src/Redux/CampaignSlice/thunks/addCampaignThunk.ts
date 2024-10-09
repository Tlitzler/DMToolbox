import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCampaign } from "../api/addCampaignAPI";
import { ICampaignObject } from "../../Types/campaign";

export const addCampaignThunk = createAsyncThunk(
    "campaign/addCampaign",
    async (campaign: ICampaignObject) => {
        const newCampaign = await addCampaign(campaign) as ICampaignObject;
        console.log('CUSTOM LOG newCampaign', newCampaign);
        return newCampaign;
    }
);