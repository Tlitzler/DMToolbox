import { RootState } from "../store";

export const selectCampaignList = (state: RootState) => state.campaigns.campaignList;
export const selectSelectedCampaign = (state: RootState) => state.campaigns.selectedCampaign;
export const selectSelectedCampaignId = (state: RootState) => state.campaigns.selectedCampaign.id;
export const selectDefaultMapId = (state: RootState) => state.campaigns.selectedCampaign.defaultMapId;