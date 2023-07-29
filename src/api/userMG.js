
import { loginreq, req, reqA } from './axiosFun';

// login api
export const login = (params) => {
  // console.log(params)
  return loginreq("post", "/api/login/", params)
};


export const getLoginUser = (params)=>{
  return req("get", "api/info/", params)
}

//
// export const menu = (params) => { return axios.get("/api/menu?&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// logout api
export const loginout = (params, params2) => {
  // console.log("logout: ", params, params2)
  return req("post", "api/exit/", params, params2)
};


// export const loginout = () => { return axios.delete("/api/login?&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
export const userRigster = (params) =>{
  return req("post", "api/register/", params)
}

// user info
export const getUserInfo = () =>{
  return req("get", "api/users/page")
}

export const getTrustEmail = (params,params2) =>{
  console.log(params,params2)
  return req("get", "api/users/trustemail/",params,params2)
}
