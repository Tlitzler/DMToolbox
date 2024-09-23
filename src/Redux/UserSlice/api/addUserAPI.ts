import axios from 'axios';
import { IUserObject } from '../../Types/user';

export const addUser = (userData: IUserObject) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: 'http://localhost:3000/users/adduser',
      params: {
        ...userData,
      },
    }).then(response => {
      resolve(response);
    }).catch(err => reject(err));
  });
};