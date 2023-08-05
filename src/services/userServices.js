import axios from 'axios';

const BASE_URL = "http://localhost:8080/demo/";

export const getAllTableData = async () => {
    return axios.get(`${BASE_URL}`).then(response => response.data).catch(err => err.message);
}