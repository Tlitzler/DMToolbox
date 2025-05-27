import axios from 'axios';

export const deleteHazard = async (hazardId: number, campaignId: number) => {
    return axios.delete('http://localhost:3000/hazards/deletehazard', { data: { campaignId: campaignId, id: hazardId } })
        .then(response => ({ id: response.data.hazardId }))
        .catch(err => err);
};