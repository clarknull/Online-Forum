
class Feedback {
    url = 'system/feedback/'
    init (api) {
      this.api = api
    }

    async add (data) {
      const url = this.url
      try {
        return await this.api.post(url, data)
      } catch (error) {
        return error
      }
    }
}

const FeedbackApi = new Feedback()

export { FeedbackApi }
