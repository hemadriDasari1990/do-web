import * as config from "./config";

import axios from "axios";

/* Set Axios config */
const axiosConfig = {
    baseURL: config.BASE_URL,
    timeout: 60000,
    headers: config.HEADERS
}

/* Create instance */
const API: any = axios.create(axiosConfig);

export default API;
