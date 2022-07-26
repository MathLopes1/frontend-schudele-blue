import axios from 'axios';

export const http = axios.create({
    baseURL: 'https://schedule-blue-backend.herokuapp.com/api/v1/'
});