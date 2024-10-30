import axios from 'axios';
import { IMapObject } from '../../Types/campaign';

export const addMap = async (map: IMapObject, userId: number, campaignId: number) => {
    return axios.post('http://localhost:3000/maps/addmap', {userId: userId, campaignId: campaignId, ...map}).then(response => ({...map, id: response.data.mapId})).catch(err => err);
}