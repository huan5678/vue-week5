import axios from 'axios';

const baseUrl = 'https://vue3-course-api.hexschool.io/v2/';

export function Api({ method, url, data = null, token }) {
  const baseURL = `${baseUrl}${url}`;

  token !== undefined && token !== null
    ? (axios.defaults.headers.common.Authorization = token)
    : delete axios.defaults.headers.common.Authorization;

  const requestConfig = {
    method,
    url: baseURL,
    data,
  };

  return axios(requestConfig);
}
