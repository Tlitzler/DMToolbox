import axios from 'axios';

export const deleteItem = async (itemId: number, campaignId: number) => {
    return axios.delete('http://localhost:3000/items/deleteitem', { data: {campaignId: campaignId, id: itemId} })
        .then(response => ({id: response.data.itemId}))
        .catch(err => err);
};