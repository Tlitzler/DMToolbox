import axios from 'axios';
import { IHazardObject } from '../../Types/campaign';

export const addHazard = async (hazard: IHazardObject, userId: number, campaignId: number) => {
    return axios.post('http://localhost:3000/hazards/addhazard', {userId: userId, campaignId: campaignId, ...hazard})
        .then(response => ({...hazard, id: response.data.hazardId}))
        .catch(err => err);
};