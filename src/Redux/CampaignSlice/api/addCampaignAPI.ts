import axios from 'axios';
import { ICampaignObject } from '../../Types/campaign';

export const addCampaign = async (campaign: ICampaignObject) => {
    return axios.post('http://localhost:3000/campaigns/addcampaign', campaign).then(response => ({...campaign, id: response.data.campaignId})).catch(err => err);
};