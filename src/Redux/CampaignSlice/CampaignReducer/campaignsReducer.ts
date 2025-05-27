import { createReducer } from '@reduxjs/toolkit';
import { ICampaignObject, IMapObject } from '../../Types/campaign';
import { addCampaignThunk } from '../thunks/addCampaignThunk';
import { fetchCampaignsThunk } from '../thunks/fetchCampaignsThunk';
import { setSelectedCampaign, setSelectedMap } from '../actions/setSelectedCampaign';
import { addMapThunk } from '../thunks/addMapThunk';
import { updateMapThunk } from '../thunks/updateMapThunk';
import { deleteMapThunk } from '../thunks/deleteMapThunk';
import { setDefaultMapThunk } from '../thunks/setDefaultMapThunk';
import { addItemThunk } from '../thunks/addItemThunk';
import { updateItemThunk } from '../thunks/updateItemThunk';
import { deleteItemThunk } from '../thunks/deleteItemThunk';
import { addHazardThunk } from '../thunks/addHazardThunk';
import { updateHazardThunk } from '../thunks/updateHazardThunk';
import { deleteHazardThunk } from '../thunks/deleteHazardThunk';

interface ICampaignSlice {
    campaignList: ICampaignObject[];
    selectedCampaign: ICampaignObject;
    selectedMap?: IMapObject;
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
    selectedMap: undefined,
};

export const campaignsReducer = createReducer(
    initialState,
    (builder) => {
        builder.addCase(addCampaignThunk.fulfilled, (state, action) => {
            const newCampaign = {...emptyCampaign, ...action.payload};
            state.campaignList.push(newCampaign);
            state.selectedCampaign = newCampaign;
            state.selectedMap = newCampaign.maps.find(map => map.id === newCampaign.defaultMapId) || undefined;
        });
        builder.addCase(fetchCampaignsThunk.fulfilled, (state, action) => {
            state.campaignList = action.payload.map(campaign => ({...emptyCampaign, ...campaign}));
        });
        builder.addCase(setSelectedCampaign, (state, action) => {
            const selectedCampaign = state.campaignList.find(campaign => campaign.id === action.payload) || {...emptyCampaign};
            state.selectedCampaign = selectedCampaign;
            state.selectedMap = selectedCampaign.maps.find(map => map.id === selectedCampaign.defaultMapId) || undefined;
        });
        builder.addCase(addMapThunk.fulfilled, (state, action) => {
            const newMap = action.payload;
            state.selectedCampaign.maps.push(newMap);
        });
        builder.addCase(setDefaultMapThunk.fulfilled, (state, action) => {
            state.selectedCampaign.defaultMapId = action.payload.defaultMapId;
        });
        builder.addCase(setSelectedMap, (state, action) => {
            const selectedMap = state.selectedCampaign.maps.find(map => map.id === action.payload);
            if (selectedMap) {
                state.selectedMap = selectedMap;
            }
        });
        builder.addCase(updateMapThunk.fulfilled, (state, action) => {
            const updatedMap = action.payload;
            console.log('Updated map:', updatedMap);
            const index = state.selectedCampaign.maps.findIndex(map => map.id === updatedMap.id);
            if (index !== -1) {
                state.selectedCampaign.maps[index] = updatedMap;
            }
        });
        builder.addCase(deleteMapThunk.fulfilled, (state, action) => {
            const mapId = action.payload.id;
            state.selectedCampaign.maps = state.selectedCampaign.maps.filter(map => map.id !== mapId);
            if (state.selectedMap?.id === mapId) {
                state.selectedMap = undefined;
            }
        });
        builder.addCase(addItemThunk.fulfilled, (state, action) => {
            const newItem = action.payload;
            state.selectedCampaign.items.push(newItem);
        });
        builder.addCase(updateItemThunk.fulfilled, (state, action) => {
            const updatedItem = action.payload;
            const index = state.selectedCampaign.items.findIndex(item => item.id === updatedItem.id);
            if (index !== -1) {
                state.selectedCampaign.items[index] = updatedItem;
            }
        });
        builder.addCase(deleteItemThunk.fulfilled, (state, action) => {
            const itemId = action.payload.id;
            state.selectedCampaign.items = state.selectedCampaign.items.filter(item => item.id !== itemId);
        });
        builder.addCase(addHazardThunk.fulfilled, (state, action) => {
            const newHazard = action.payload;
            state.selectedCampaign.hazards.push(newHazard);
        });
        builder.addCase(updateHazardThunk.fulfilled, (state, action) => {
            const updatedHazard = action.payload;
            console.log('Updated hazard:', updatedHazard);
            const index = state.selectedCampaign.hazards.findIndex(hazard => hazard.id === updatedHazard.id);
            if (index !== -1) {
                state.selectedCampaign.hazards[index] = updatedHazard;
            }
        });
        builder.addCase(deleteHazardThunk.fulfilled, (state, action) => {
            const hazardId = action.payload.id;
            state.selectedCampaign.hazards = state.selectedCampaign.hazards.filter(hazard => hazard.id !== hazardId);
        });
    }
);