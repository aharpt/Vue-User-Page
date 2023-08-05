import axios from 'axios';

const URL = "http://localhost:8080/demo/all";

export const getAllTableData = async () => {
    return axios.get(URL).then(response => response.data).catch(err => err.message);
}


