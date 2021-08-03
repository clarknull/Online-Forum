import { UserApi } from '../../api/user'

class User {
    api = null

    init (api) {
      this.api = UserApi
      this.api.init(api)
    }

    get profile () {
      return ''
    }

    set profile (value) {

    }

    async login (data) {
      const response = await this.api.login(data)
      if (response.status === 200) {
        this.clearUserData()
        this.storeUserData(response.data)
      } return response
    }

    logout () {
      this.clearUserData()
    }

    async getProfile (hash) {
      const user = hash ? {} : this.getUserData()
      if (!user.profile) {
        const response = await this.api.getProfile(hash)
        if (response.status === 200) {
          user.profile = { ...response.data }
          this.storeUserData(user)
        } else { return response }
      }
      return user.profile
    }

    async updateProfile (data) {
      const response = await this.api.updateProfile(data)
      if (response.status === 200) {
        const user = this.getUserData()
        if (user.token) {
          user.profile = response.data
          this.storeUserData(user)
        }
      }
      return response
    }

    async register (data) {
      const response = await this.api.register(data)
      if (response.status === 200) {
        this.clearUserData()
        this.storeUserData(response.data)
      } return response
    }

    async changePassword (data) {
      return await this.api.changePassword(data)
    }

    storeUserData (data) {
      sessionStorage.setItem('user', JSON.stringify(data))
      this.setToken(data.token)
    }

    getUserData () {
      return JSON.parse(sessionStorage.getItem('user') || {})
    }

    clearUserData () {
      this.setToken()
      sessionStorage.removeItem('user')
    }

    setToken (token) {
      this.api.setToken(token)
    }
}

const UserController = new User()

export { UserController }
