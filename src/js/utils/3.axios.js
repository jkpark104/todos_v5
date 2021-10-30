import axios from 'axios';

export default {
  get(url) {
    return axios.get(url).then(({ data }) => data);
  },

  post(url, payload) {
    return axios.post(url, payload).then(({ data }) => data);
    // return fetch(url, {
    //   method: 'POST',
    //   headers: { 'content-Type': 'application/json' },
    //   body: JSON.stringify(payload)
    // }).then(parseToJSON);
  },

  patch(url, payload) {
    return axios.post(url, payload).then(({ data }) => data);
    // return fetch(url, {
    //   method: 'PATCH',
    //   headers: { 'content-Type': 'application/json' },
    //   body: JSON.stringify(payload)
    // }).then(parseToJSON);
  },

  delete(url) {
    return axios.delete(url).then(({ data }) => data);
    // return fetch(url, { method: 'DELETE' }).then(parseToJSON);
  }
};
