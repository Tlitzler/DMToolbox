import { createReducer } from '@reduxjs/toolkit';
import { ICampaignObject } from '../../Types/campaign';
import { addCampaignThunk } from '../thunks/addCampaignThunk';
import { fetchCampaignsThunk } from '../thunks/fetchCampaignsThunk';
import { setSelectedCampaign } from '../actions/setSelectedCampaign';

interface ICampaignSlice {
    campaignList: ICampaignObject[];
    selectedCampaign: ICampaignObject;
};

export const emptyCampaign: ICampaignObject = {
    userId: 0,
    name: '',
    id: -1,
    description: '',
    characters: [],
    enemies: [],
    hazards: [],
    encounters: [],
    encounterTables: [],
    factions: [],
    events: [],
    locations: [],
    maps: [],
    parties: [],
    items: [],
    folders: [],
    date: '',
};

const initialState: ICampaignSlice = {
    campaignList: [],
    selectedCampaign: {...emptyCampaign},
};

export const campaignsReducer = createReducer(
    initialState,
    (builder) => {
        builder.addCase(addCampaignThunk.fulfilled, (state, action) => {
            state.campaignList.push(action.payload);
            state.selectedCampaign = action.payload;
        });
        builder.addCase(fetchCampaignsThunk.fulfilled, (state, action) => {
            state.campaignList = action.payload;
        });
        builder.addCase(setSelectedCampaign, (state, action) => {
            state.selectedCampaign = state.campaignList.find(campaign => campaign.id === action.payload) || {...emptyCampaign};
        });
    }
);