import axios from 'axios';

export const setDefaultMap = async (mapId: number, campaignId: number) => {
    return axios.put('http://localhost:3000/campaigns/setdefaultmap', {mapId: mapId, campaignId: campaignId}).then(response => response.data).catch(err => err);
};