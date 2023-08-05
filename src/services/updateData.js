import axios from 'axios';

const URL = "http://localhost:8080/demo/update";

export const updateUser = async (id, name, email) => {
    return axios.put(`${URL}?id=${id}&name=${name}&email=${email}`).then(response => response.data).catch(err => err.message);
}