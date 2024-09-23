import { createReducer } from '@reduxjs/toolkit';
import { ICampaignObject } from '../../Types/campaign';

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
        //add thunks here
    }
);