import axios from 'axios';
import Config from 'react-native-config';

axios.defaults.baseURL = Config.API_URL || 'http://192.168.100.4:8888/infotouch-terminal/api';
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest'
};

axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});