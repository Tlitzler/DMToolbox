import axios from 'axios';

export const fetchCampaigns = async (userId: number) => {
    return axios.get('http://localhost:3000/campaigns/fetchcampaigns', {
        params: {
        userId,
        },
    }).then(response => response.data.campaigns).catch(err => err);
};