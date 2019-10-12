import axios from 'axios'
// 定义公共的url
axios.defaults.baseURL = process.env.REACT_APP_API_URL
export default axios