import axios from 'axios'
import { Toast} from 'antd-mobile';

// 定义公共的url
axios.defaults.baseURL = process.env.REACT_APP_API_URL

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 添加loadding事件
    Toast.loading('加载中...', 0)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //   关闭loadding事件
    Toast.hide()
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default axios