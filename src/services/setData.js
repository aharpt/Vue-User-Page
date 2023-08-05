import axios from 'axios';

const URL = "http://localhost:8080/demo/add";

export const addUser = async (name, email) => {
    return axios.post(`${URL}?name=${name}&email=${email}`).then(response => response.data).catch(err => err.message);
}

