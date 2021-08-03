import { RequestApi } from '../../api/request'

class Request {
  init (api) {
    this.api = RequestApi
    this.api.init(api)
  }

  async getRequest () {
    return await this.api.getRequest()
  }

  async getHistory () {
    return await this.api.getHistory()
  }

  async getSingle (item) {
    return await this.api.getSingle(item.hash)
  }

  async delete (item) {
    return await this.api.delete(item.hash)
  }

  async add (data) {
    return await this.api.add(data)
  }
}

const RequestController = new Request()
export { RequestController }
