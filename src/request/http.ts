import axios from 'axios';
import configs from '@/configs';
import { notification } from 'antd';
import { getForageItem, setForageItem, removeForageItem } from '@/utils/localStorage';
import { HTTP_STATUS } from './types';
const http = axios.create({
  ...configs.api,
  baseURL: `${configs.api.baseUrl}`,
});


const loginout = () => {
  removeForageItem('token');
  window.location.assign(`/login`);
};

/** 请求拦截器 */
http.interceptors.request.use(
  async (config) => {
    const { headers } = config;
    const newToken = (await getForageItem('token')) as string;
    // 存储token
    headers.authorization = newToken;
    return { ...config, ...{ ...headers, responseType: 'json' } };
  },
  (error) => {
    notification.error({
      message: '请求异常',
      description: error.message,
    });
    return Promise.reject(error);
  }
);
/** 响应拦截器 */
http.interceptors.response.use(
  async (response) => {
    const { data: result, headers, status } = response;
    const { authorization } = headers;
    const { code } = result;
    console.log('请求响应拦截器，auth', authorization, response);
    if (result.error_reponse) {
      notification.error({
        message: result.error_reponse.msg,
      });
      return;
    }
    if (result.code === HTTP_STATUS.AUTHENTICATE) {
      // token失效，重新登录, 这里注释掉
      // loginout();
      return;
    }
    if (authorization) {
      setForageItem('token', authorization);
    }
    /** 请求状态码200但是异常， 或请求状态码非200 直接报错 */
    if (status === HTTP_STATUS.SUCCESS && code !== HTTP_STATUS.SUCCESS || status !== HTTP_STATUS.SUCCESS) {
      notification.error({
        message: result.message || '接口异常，请联系管理员',
      });
    }
    return result;
  },
  (error: any) => {
    const { response = {} } = error ?? {};
    // if (err?.message === 'cancelToken') return;
    if (response?.data) {
      notification.error({
        message: response.data.message || response.data.msg || '接口异常',
      });
    } else {
      notification.error({
        message: error.message || '接口异常',
      });
    }
    if (response?.status === 401) {
      // loginout();
    }
    return Promise.reject(error);
  }
);

export default http;
