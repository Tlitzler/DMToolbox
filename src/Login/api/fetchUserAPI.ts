import axios from 'axios';

export const fetchUserAPI = (email: string) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/users/fetchuser',
      params: {
        email,
      },
    }).then(response => {
      resolve(response);
    }).catch(err => reject(err));
  });
};