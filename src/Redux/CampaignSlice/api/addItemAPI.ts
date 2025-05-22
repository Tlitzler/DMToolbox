import axios from 'axios';
import { IItemObject } from '../../Types/campaign';

export const addItem = async (item: IItemObject, userId: number, campaignId: number) => {
    return axios.post('http://localhost:3000/items/additem', {userId: userId, campaignId: campaignId, ...item}).then(response => ({...item, id: response.data.itemId})).catch(err => err);
}