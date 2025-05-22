import axios from 'axios';

export const deleteMap = async (mapId: number, campaignId: number) => {
    return axios.delete('http://localhost:3000/maps/deletemap', { data: {campaignId: campaignId, id: mapId} }).then(response => ({id: response.data.mapId})).catch(err => err);
}