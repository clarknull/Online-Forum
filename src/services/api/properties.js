
class Address {
    url = 'system/address/'
    init (api) {
      this.api = api
    }

    async updateAddress (hash, text) {
      const url = this.url + hash
      try {
        return await this.api.put(url, { text: text })
      } catch (error) {
        return error
      }
    }
}

const AddressApi = new Address()

export { AddressApi }
