const req = (method, url, callback, payload) => {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(payload));

  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
      callback(JSON.parse(xhr.response));
    } else {
      console.error(xhr.status, xhr.statusText);
    }
  };
};

export default {
  get(url, callback) {
    req('GET', url, callback);
  },

  post(url, payload, callback) {
    req('POST', url, callback, payload);
  },

  patch(url, payload, callback) {
    req('PATCH', url, callback, payload);
  },

  delete(url, callback) {
    req('DELETE', url, callback);
  }
};

// export const get = (url, callback) => {
//   const xhr = new XMLHttpRequest();

//   xhr.open('GET', url);
//   xhr.send();

//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       callback(JSON.parse(xhr.response)); // 함수의 리턴값은 호출자가 받을 수 있음
//     } else {
//       console.error(xhr.status, xhr.statusText);
//     }
//   };
// };

// export const post = (url, payload, callback) => {
//   // callback이 2개 이상 있을 수 있음 | cb는 맨 앞이나 맨 뒤
// const xhr = new XMLHttpRequest();

// xhr.open('POST', url);
// xhr.setRequestHeader('content-type', 'application/json'); // 2가지 파라미터 모두 형식이 정해져 있음
// xhr.send(JSON.stringify(payload)); // 페이로드가 존재하면 데이터의 타입을 알려줘야 함 -> 헤더 세팅

// xhr.onload = () => {
//   if (xhr.status === 200 || xhr.status === 201) {
//     callback(JSON.parse(xhr.response));
//   } else {
//     console.error(xhr.status, xhr.statusText);
//   }
// };
// };

// export const patch = (url, payload, callback) => {
//   const xhr = new XMLHttpRequest();

//   xhr.open('PATCH', url);
//   xhr.setRequestHeader('content-type', 'application/json');
//   xhr.send(JSON.stringify(payload));

//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       callback(JSON.parse(xhr.response));
//     } else {
//       console.error(xhr.status, xhr.statusText);
//     }
//   };
// };

// export const remove = (url, callback) => {
//   const xhr = new XMLHttpRequest();

//   xhr.open('DELETE', url);
//   xhr.send();

//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       callback(JSON.parse(xhr.response));
//     } else {
//       console.error(xhr.status, xhr.statusText);
//     }
//   };
// };
