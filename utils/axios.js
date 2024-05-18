const axios = require("axios");

const axiosService = axios.create({});

// interceptor for http
axiosService.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

module.exports = axiosService;
