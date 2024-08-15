import axios from 'axios';

export const authenticateAPI = (params: {email: string; password: string;}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/users/authenticateuser',
      params,
    }).then(response => {
      resolve(response);
    }).catch(err => reject(err));
  });
};