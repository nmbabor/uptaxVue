import router from '../router'
import Axios from 'axios'
export default () => {
    let apiUrl = localStorage.getItem("apiUrl")
    const instance = Axios.create({
        baseURL: apiUrl + 'api',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (localStorage.getItem('token') !== null) {
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    }

    // Add a request interceptor
    instance.interceptors.request.use(function(config) {
        // Do something before request is sent
        return config;
    }, function(error) {
        let status = error.response.status
        if (status === 401) {
            localStorage.removeItem('token')
            router.push({ path: '/login' })
        } else if (status === 403) {
            //router.push({ path: '/403' })
        } else if (status === 404) {
            router.push({ path: '/404' })
        } else if (status === 500) {
            //router.push({path: '/500'})
        }
        return Promise.reject(error);
    });


    // Add a response interceptor
    instance.interceptors.response.use(function(response) {
        // Do something with response data
        return response;
    }, function(error) {

        let status = error.response.status
        if (status === 401) {
            localStorage.removeItem('token')
            router.push({ path: '/login' })
        } else if (status === 403) {
            //router.push({ path: '/403' })
        } else if (status === 404) {
            router.push({ path: '/404' })
        } else if (status === 500) {
            //router.push({path: '/500'})
        }
        return Promise.reject(error);
    });
    return instance
}