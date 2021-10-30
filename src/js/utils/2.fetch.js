const parseToJSON = res => {
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};

export default {
  get(url) {
    // return fetch(url);
    return fetch(url).then(parseToJSON);
    // res.json()도 프로미스를 리턴함
  },

  post(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(parseToJSON);
  },

  patch(url, payload) {
    return fetch(url, {
      method: 'PATCH',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(parseToJSON);
  },

  delete(url) {
    return fetch(url, { method: 'DELETE' }).then(parseToJSON);
  }
};
