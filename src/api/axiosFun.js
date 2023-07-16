import axios from 'axios';

// login request
const loginreq = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: params,
        traditional: true,
        transformRequest: [
            function(data) {
                let ret = ''
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ]
    }).then(res => res.data);
};
// regular request
const req = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: params,
        traditional: true,
        transformRequest: [
            function(data) {
                let ret = ''
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ]
    }).then(res => res.data);
};

// return json string
export const reqA = (method, url, params) => {
  return axios({
    method: method,
    url: url,
    headers: {
      'Content-Type': 'application/json;, application/json'
    },
    data: JSON.stringify(params),
    traditional: true,
  }).then(res => res.data);
};

// for example: params2 is the "id", and then params is 2
export const formreq = (method, url, params, params2)=>{
  return axios({
    method: method,
    url: `${url}?${params2}=${params}`,
  }).then(res => res.data);
};

export {
    loginreq,
    req,
}
