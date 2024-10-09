import { fetchCampaigns } from "../api/fetchCampaignsAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICampaignObject } from "../../Types/campaign";

export const fetchCampaignsThunk = createAsyncThunk(
    "campaign/fetchCampaigns",
    async (userId: number) => {
        const campaigns = await fetchCampaigns(userId) as ICampaignObject[];
        return campaigns;
    }
);