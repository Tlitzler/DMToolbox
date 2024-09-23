import { RootState } from "../store";

export const selectCampaignList = (state: RootState) => state.campaigns.campaignList;
export const selectSelectedCampaign = (state: RootState) => state.campaigns.selectedCampaign;