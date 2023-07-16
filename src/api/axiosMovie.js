import { req,formreq } from './axiosFun';



export const getAdminInfo = () => {
  return req("get", "api/admins/page/")
};

// getPageInfo
