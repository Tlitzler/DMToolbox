import axios from 'axios';
import { IHazardObject } from '../../Types/campaign';

export const updateHazard = async (hazard: IHazardObject) => {
    return axios.put('http://localhost:3000/hazards/updatehazard', hazard)
        .then(response => ({...hazard, id: response.data.hazardId}))
        .catch(err => err);
}