import { createReducer } from '@reduxjs/toolkit';
import { ICampaignObject } from '../../Types/campaign';

interface ICampaignSlice {
    campaigns: ICampaignObject[];
    selectedCampaign: ICampaignObject;
};

const initialState: ICampaignSlice = {
    campaigns: [],
    selectedCampaign: {
        userId: 0,
        name: '',
        id: 1,
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
    },
};

export const campaignReducer = createReducer(
    initialState,
    (builder) => {
        //add thunks here
    }
);