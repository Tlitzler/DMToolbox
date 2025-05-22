import axios from 'axios';
import { IMapObject } from '../../Types/campaign';

export const updateMap = async (map: IMapObject) => {
    return axios.put('http://localhost:3000/maps/updatemap', map).then(response => ({...map, id: response.data.mapId})).catch(err => err);
};