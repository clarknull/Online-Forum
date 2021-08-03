const model = {
  code: 0, message: {}, details: '', model: true
}

class ErrorCatcher {
    model = model

    parserError (error) {
      this.resetModel()

      if (error.status) {
        this.model.code = error.status
        this.details = this.message = error.statusText
        return this.model
      }
      if (error.response) {
        const response = error.response
        this.model.code = response.status
        this.details = response.statusText
        if (response.status === 404) { this.model.message = response.statusText; return this.model }
        this.parserDetails(response.data)
        this.parserBody(response.data)
      } else if (error.request) {
        this.model.code = 0
        this.details = 'Connection Error, The server seems to be unreachable please try again later'
      } else {
        this.model.code = 0
        this.details = 'Connection Error, Please check your internet connection'
      }
      return this.model
    }

    parserDetails (data) {
      if ('error' in data) {
        this.model.details = Array.isArray(data.error) ? data.error[0] : data.error
      } else if ('details' in data) {
        this.model.details = Array.isArray(data.details) ? data.details[0] : data.details
      }
    }

    parserBody (data) {
      if (typeof data === 'object') {
        for (const key in data) {
          if (Array.isArray(data[key])) {
            this.model.message[key] = data[key][0]
          } else if (typeof data === 'object') {
            this.parserBody(data[key])
          } else {
            this.model.message[key] = data[key]
          }
        }
      }
    }

    resetModel () {
      this.model = { code: 0, message: {}, details: '', model: true }
    }
}

const ErrorParser = new ErrorCatcher()

export { ErrorParser }
