import { UserController } from '../manager/controller/user'
import { RequestController } from '../manager/controller/request'
import { FeedbackController } from '../manager/controller/feedback'
import { ErrorParser } from './errorParser'

class Control {
  init (store) {
    const api = window.axios
    this.user = UserController
    this.request = RequestController
    this.feedback = FeedbackController
    this.store = store
    this.feedback.init(api)
    this.user.init(api)
    this.request.init(api)
    this.login()
  }

  parseError (error, successMessage) {
    if (error.response) {
      if (error.response.status === 401) {
        this.user.logout()
      }
    }
    var model = ErrorParser.parserError(error)
    model.model = true
    model.success = successMessage
    return model
  }

  isAuthenticated () {
    const val = this.store.state.user
    return !!val.token
  }

  login () {
    this.store.commit('updateUser')
    this.user.setToken(this.store.state.user.token)
  }

  logout () {
    this.user.logout()
    this.store.commit('updateUser')
    this.user.setToken()
  }
}

const Controller = new Control()

export { Controller }
