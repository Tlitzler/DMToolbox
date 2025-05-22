import { RootState } from "../store";

export const selectCampaignList = (state: RootState) => state.campaigns.campaignList;
export const selectSelectedCampaign = (state: RootState) => state.campaigns.selectedCampaign;
export const selectSelectedCampaignId = (state: RootState) => state.campaigns.selectedCampaign.id;
export const selectDefaultMapId = (state: RootState) => state.campaigns.selectedCampaign.defaultMapId;
export const selectMaps = (state: RootState) => state.campaigns.selectedCampaign.maps;
export const selectSelectedMap = (state: RootState) => state.campaigns.selectedMap;
export const selectItems = (state: RootState) => state.campaigns.selectedCampaign.items;