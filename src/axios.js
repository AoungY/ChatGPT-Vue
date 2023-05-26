import axios from 'axios'
// 设置axios基准地址
axios.defaults.baseURL = 'http://localhost:8089/api/v1/'
// 拦截请求 设置请求头
// axios.interceptors.request.use(
//     config => {
//         if (config.url != '/login') {
//             config.headers['Authorization'] = window.localStorage.getItem('token');
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

export default axios