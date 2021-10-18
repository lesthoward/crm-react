import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: 'https://crm-react-lesthoward.herokuapp.com'
})

export default axiosInstance