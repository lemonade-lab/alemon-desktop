/**
 * 网络请求配置
 */
import axios, { AxiosRequestConfig } from 'axios'
import { AxiosRequestHeaders } from 'axios'
import useLogin from './login'

axios.defaults.timeout = 100000
axios.defaults.baseURL = 'https://alemonjs.com/v1/api'
/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  config => {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/x-www-form-urlencoded'
    } as AxiosRequestHeaders
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('请求出错：', error)
    throw error
  }
)
const useAxios = () => {
  const loginSlice = useLogin()
  const { state } = loginSlice
  /**
   * 封装get方法
   * @param url  请求url
   * @param params  请求参数
   * @returns {Promise}
   */
  const get = async (url: string, params = {} as any): Promise<any> => {
    try {
      let options: AxiosRequestConfig<any> = {
        params: params
      }
      if (state.token) {
        options = {
          ...options,
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        }
      }
      const result = await axios.get(url, options)
      return result.data
    } catch (err) {
      throw msag(err)
    }
  }

  /**
   * 封装post请求
   * @param url
   * @param data
   * @returns {Promise}
   */

  const post = async (url: string, data = {} as any): Promise<any> => {
    try {
      let options: AxiosRequestConfig<any> = {
        data: data
      }
      if (state.token) {
        options = {
          ...options,
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        }
      }
      const result = await axios.post(url, data, options)
      return result.data
    } catch (err) {
      throw msag(err)
    }
  }

  /**
   * 封装patch请求
   * @param url
   * @param data
   * @returns {Promise}
   */
  const patch = async (url: string, data = {} as any): Promise<any> => {
    try {
      let options: AxiosRequestConfig<any> = {
        data: data
      }
      if (state.token) {
        options = {
          ...options,
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        }
      }
      const result = await axios.patch(url, data, options)
      return result.data
    } catch (err) {
      throw msag(err)
    }
  }

  /**
   * 封装put请求
   * @param url
   * @param data
   * @returns {Promise}
   */
  const put = async (url: string, data = {} as any): Promise<any> => {
    try {
      let options: AxiosRequestConfig<any> = {
        data: data
      }
      if (state.token) {
        options = {
          ...options,
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        }
      }
      const result = await axios.put(url, data, options)
      return result.data
    } catch (err) {
      throw msag(err)
    }
  }

  /**
   * 封装带 params 的 post 请求
   */
  const postWithParams = async (
    url: string,
    data = {} as any,
    params = {} as any
  ): Promise<any> => {
    let options: AxiosRequestConfig<any> = {
      params: params
    }
    if (state.token) {
      options = {
        ...options,
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      }
    }
    try {
      const result = await axios.post(url, data, options)
      return result.data
    } catch (err) {
      throw msag(err)
    }
  }

  const getCode = async (retry = 0): Promise<any> => {
    try {
      const result = await get(Api.getVerifyCode)
      return result.data
    } catch (error) {
      if (retry < 5) {
        return getCode(retry + 1)
      } else {
        throw msag(error)
      }
    }
  }

  return {
    get,
    post,
    postWithParams,
    patch,
    put,
    getCode
  }
}

export default useAxios

//失败提示
function msag(err: any) {
  let errmsg
  console.log('err', err?.response)
  if (err?.response?.data?.msg) {
    errmsg = err.response.data.msg
  } else if (err && err.response) {
    switch (err.response.status) {
      case 400:
        errmsg = '请求错误'
        break
      case 401:
        errmsg = '未授权，请登录'
        break
      case 403:
        errmsg = '拒绝访问'
        break
      case 404:
        errmsg = '请求地址不存在'
        break
      case 408:
        errmsg = '请求超时'
        break
      case 500:
        errmsg = '服务器内部错误'
        break
      case 501:
        errmsg = '服务未实现'
        break
      case 502:
        errmsg = '网关错误'
        break
      case 503:
        errmsg = '服务不可用'
        break
      case 504:
        errmsg = '网关超时'
        break
      case 505:
        errmsg = 'HTTP版本不受支持'
        break
      default:
        errmsg = '请求错误'
    }
  } else if (err?.message) {
    errmsg = err.message
  }
  return errmsg
}

export enum Api {
  login = '/user/login',
  register = '/user/logon',
  userInfo = '/user/message',
  getPlugins = '/plugin/search',
  getVerifyCode = '/common/code'
}
