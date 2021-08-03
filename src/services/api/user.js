
class User {
    url = 'user/'
    profileUrl = 'system/user/profile'
    init (api) {
      this.api = api
    }

    async login (user) {
      const url = this.url + 'login'
      try {
        const response = await this.api.post(url, user)
        return response
      } catch (error) {
        return error
      }
    }

    async register (user) {
      const url = this.url + 'signup'
      try {
        const response = await this.api.post(url, user)
        return response
      } catch (error) {
        return error
      }
    }

    async changePassword (data) {
      const url = this.url + 'profile/password'
      try {
        const response = await this.api.put(url, data)
        return response
      } catch (error) {
        return error
      }
    }

    async updateProfile (data) {
      const url = this.profileUrl
      try {
        const response = await this.api.put(url, data)
        return response
      } catch (error) {
        return error
      }
    }

    async getProfile () {
      try {
        return await this.api.get(this.profileUrl)
      } catch (error) { return error }
    }

    setToken (token) {
      const value = token ? `Bearer ${token}` : ''
      this.api.defaults.headers.common.Authorization = value
    }
}

const UserApi = new User()

export { UserApi }
