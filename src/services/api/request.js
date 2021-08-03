
class Request {
    url = 'system/request/'
    userRequest = 'system/user/request'
    init (api) {
      this.api = api
    }

    async getRequest () {
      try {
        return await this.api.get(this.userRequest)
      } catch (error) {
        return error
      }
    }

    async getHistory () {
      try {
        return await this.api.get(this.userRequest + '?status=0')
      } catch (error) {
        return error
      }
    }

    async delete (hash) {
      const url = this.url + `${hash}`
      try {
        const response = await this.api.delete(url)
        return response
      } catch (error) {
        return error
      }
    }

    async add (data) {
      try {
        return await this.api.post(this.userRequest, data)
      } catch (error) {
        return error
      }
    }
}

const RequestApi = new Request()

export { RequestApi }
