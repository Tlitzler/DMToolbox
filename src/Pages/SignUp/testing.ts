import axios from 'axios';

export const testRequest = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/addemployee1',
    }).then(response => {
      console.log('Test Request response: ', response);
      resolve(response);
    }).catch(err => reject(err));
  });
};
  