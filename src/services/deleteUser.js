import axios from 'axios';

export const deleteUser = async (userID) => {
    const URL = `http://localhost:8080/demo/delete?id=${userID}`;

    return axios.delete(URL).then(response => response.data).catch(err => err.message);
}


