import { createReducer } from '@reduxjs/toolkit';
import { ICampaignObject } from '../../Types/campaign';

interface ICampaignSlice {
    campaignList: ICampaignObject[];
    selectedCampaign: ICampaignObject;
};

const initialState: ICampaignSlice = {
    campaignList: [],
    selectedCampaign: {
        name: '',
        description: '',
        id: 1,
        characterList: [],
        encounterTableList: [],
        factionList: [],
        date: '',
        mapList: [],
        partyList: [],
        userId: 0,
    },
};

export const campaignReducer = createReducer(
    initialState,
    (builder) => {
        //add thunks here
    }
);