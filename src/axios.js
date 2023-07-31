import axios from 'axios';

export const SERVER_URL = 'http://localhost:4000';

const instance = axios.create({
    baseURL: SERVER_URL,
});

export default instance;
