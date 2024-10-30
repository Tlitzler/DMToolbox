import { createReducer } from '@reduxjs/toolkit';
import { ICampaignObject } from '../../Types/campaign';
import { addCampaignThunk } from '../thunks/addCampaignThunk';
import { fetchCampaignsThunk } from '../thunks/fetchCampaignsThunk';
import { setSelectedCampaign } from '../actions/setSelectedCampaign';
import { addMapThunk } from '../thunks/addMapThunk';
import { setDefaultMapThunk } from '../thunks/setDefaultMapThunk';

interface ICampaignSlice {
    campaignList: ICampaignObject[];
    selectedCampaign: ICampaignObject;
};

export const emptyCampaign: ICampaignObject = {
    userId: 0,
    name: '',
    id: -1,
    description: '',
    defaultMapId: null,
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
            const newCampaign = {...emptyCampaign, ...action.payload};
            state.campaignList.push(newCampaign);
            state.selectedCampaign = newCampaign;
        });
        builder.addCase(fetchCampaignsThunk.fulfilled, (state, action) => {
            state.campaignList = action.payload.map(campaign => ({...emptyCampaign, ...campaign}));
        });
        builder.addCase(setSelectedCampaign, (state, action) => {
            state.selectedCampaign = state.campaignList.find(campaign => campaign.id === action.payload) || {...emptyCampaign};
        });
        builder.addCase(addMapThunk.fulfilled, (state, action) => {
            const newMap = action.payload;
            state.selectedCampaign.maps.push(newMap);
        });
        builder.addCase(setDefaultMapThunk.fulfilled, (state, action) => {
            state.selectedCampaign.defaultMapId = action.payload.defaultMapId;
        });
    }
);