import axios from 'axios';

const backendConf = {
  baseUrl: 'http://127.0.0.1:8001/',
  latestVersion: 'v1/'
};

const backend = axios.create({
  baseURL: `${backendConf.baseUrl}${backendConf.latestVersion}`,
  timeout: 5000
});

export default backend;
