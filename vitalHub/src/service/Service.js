import axios from 'axios';

const portaApi = '4466';

const ip = '192.168.21.78';

const apiUrlLocal = `http://${ip}:${portaApi}/api`;

const api = axios.create({
	baseURL: apiUrlLocal,
});

export default api;
