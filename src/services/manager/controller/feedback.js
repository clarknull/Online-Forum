import { FeedbackApi } from '../../api/feedback'

class Feedback {
  init (api) {
    this.api = FeedbackApi
    this.api.init(api)
  }

  async add (data) {
    return await this.api.add(data)
  }
}

const FeedbackController = new Feedback()
export { FeedbackController }
