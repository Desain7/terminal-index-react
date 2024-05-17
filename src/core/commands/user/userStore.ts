import { defineStore } from 'pinia'
import { getLoginUser } from './userApi'
import { LOCAL_USER } from './userConstant'
import UserType = User.UserType

/**
 * 用户系统
 */
export const useUserStore = defineStore('user', {
  state: () => ({
    loginUser: {
      ...LOCAL_USER
    },
    jwtToken: ''
  }),
  getters: {},
  // 持久化
  persist: {
    key: 'user-store',
    storage: window.localStorage,
    beforeRestore: (context) => {
      console.log('load userStore data start')
    },
    afterRestore: (context) => {
      console.log('load userStore data end')
    }
  },
  actions: {
    async getAndSetLoginUser() {
      try {
        const res: any = await getLoginUser()
        console.log('res', res)
        if (res?.code === 0 && res.data) {
          this.loginUser = res.data
        } else {
          console.error('登录失败')
          this.$reset()
        }
      } catch (err: any) {
        console.log('身份验证过期')
        this.$reset()
      }
    },
    getToken() {
      return this.jwtToken
    },
    setLoginUser(user: UserType) {
      this.loginUser = user
    },
    setLocalJWT(token: string) {
      this.jwtToken = token
    },
    cleanLocalJWT() {
      this.jwtToken = ''
    }
  }
})
