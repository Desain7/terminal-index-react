declare namespace LocalUser {
  /**
   * 用户类型
   */
  interface UserType {
    username: string
    email?: string
    createTime?: date
    updateTime?: date
  }
}
