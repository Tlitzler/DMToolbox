import axios from 'axios';
import { IItemObject } from '../../Types/campaign';

export const updateItem = async (item: IItemObject) => {
    return axios.put('http://localhost:3000/items/updateitem', item).then(response => ({...item, id: response.data.itemId})).catch(err => err);
};