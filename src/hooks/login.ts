/**
 * Login Hooks
 */
import { useDispatch, useSelector } from 'react-redux'
import { setToken as appSetToken, removeToken } from '@/store/login'
import { LoginState } from '@/store/login'
import { ipcRenderer } from 'electron'
import { AppEvent } from './ipc'
import { LoginPayload, RegisterPayload, SendEmailPayload } from '@/type/user'
const loginSlice = (state: any) => state.login

const useLogin = () => {
  const dispatch = useDispatch()
  const state: LoginState = useSelector(loginSlice)
  const setToken = (token: string) => {
    dispatch(appSetToken(token))
  }
  const logout = () => {
    dispatch(removeToken())
  }
  const login = (data: LoginPayload) => {
    console.log('login', data)
    ipcRenderer.send(AppEvent.login, data)
  }
  const register = (data: RegisterPayload) => {
    console.log('register', data)
    ipcRenderer.send(AppEvent.register, data)
  }
  const sendEmail = (data: SendEmailPayload) => {
    console.log('sendEmail', data)
    ipcRenderer.send(AppEvent.sendEmailVerifyCode, data)
  }

  const isLogin = () => {
    return state.login
  }
  return {
    state,
    login,
    register,
    sendEmail,
    setToken,
    logout,
    isLogin
  }
}

export default useLogin
