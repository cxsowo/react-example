import { includes, isPlainObject, startsWith } from 'lodash';

let host = window.location.origin;

function setHost(h) {
  host = h;
}

function generateRequest(path: string, options = {}) {
  const newOptions = { mode: 'cors', ...options };
  newOptions.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
    credential: 'same-origin',
    ...(options.headers || {})
  };
  if (options.body) {
    newOptions.body = JSON.stringify(options.body);
  }

  return new Promise((resolve, reject) => {
    fetch(startsWith(path, 'http') ? path : host + path, newOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.err) {
          reject(new Error(res.msg || '服务器摸鱼了吧？？'));
        }
        resolve(res);
      })
      .catch((e) => {
        console.error(e);
        reject(new Error('服务器摸鱼了吧？？'));
      });
  });
}

function get(url, options = {}) {
  return generateRequest(url, { ...options, method: 'GET' });
}

function post(url, options = {}) {
  return generateRequest(url, { ...options, method: 'POST' });
}

function put(url, options = {}) {
  return generateRequest(url, { ...options, method: 'PUT' });
}

function remove(url, options = {}) {
  return generateRequest(url, { ...options, method: 'DELETE' });
}

function patch(url, options = {}) {
  return generateRequest(url, { ...options, method: 'PATCH' });
}

export default {
  setHost,
  get,
  post,
  put,
  remove,
  patch
};
