import axios from 'axios';
import { Qs } from 'axios';

const instance = axios.create({
  baseURL: 'https://firestore.googleapis.com/v1beta1/projects/mejenga-8c3e2/databases/(default)'
});

// instance.interceptors.request.use(config => {
//   config.paramsSerializer = params => {
//     return Qs.stringify(params, {
//       arrayFormat: "brackets",
//       encode: false
//     });
//   }
// })

export default instance;