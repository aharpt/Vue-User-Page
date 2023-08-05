import axios from 'axios';

const BASE_URL = "http://localhost:8080/demo";

export const getAllUsers = async () => {
    return axios.get(`${BASE_URL}/all`).then(response => response.data).catch(err => err.message);
}

export const addUser = async (name, email) => {
    return axios.post(`${BASE_URL}/add?name=${name}&email=${email}`).then(response => response.data).catch(err => err.message);
}

export const updateUser = async (id, name, email) => {
    return axios.put(`${BASE_URL}/update?id=${id}&name=${name}&email=${email}`).then(response => response.data).catch(err => err.message);
}

export const deleteUser = async (userID) => {
    return axios.delete(`${BASE_URL}/delete?id=${userID}`).then(response => response.data).catch(err => err.message);
}