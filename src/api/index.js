import axios from 'axios';

const baseUrl = 'https://vue3-course-api.hexschool.io/v2/';

export function Api({ method, url, data = null, token }) {
  const baseURL = `${baseUrl}${url}`;

  axios.defaults.headers.common.Authorization = token;

  const requestConfig = {
    method,
    url: baseURL,
    data,
  };

  return axios(requestConfig);
}
