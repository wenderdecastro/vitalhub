import axios from 'axios';

const port = '4466';

const ip = '172.16.39.111';

const apiUrlLocal = `http://${ip}:${port}/api`;

export const api = axios.create({
	baseURL: apiUrlLocal,
});
