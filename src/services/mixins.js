
const Rules = {
  require: (v) => {
    return !!v || 'Input is required'
  },
  none: (v) => {
    return true || ''
  },
  minLength: (v, n) => {
    if (!v) { return false }
    return v.length >= n || `input must be at least ${n} characters`
  },
  maxLength: (v, n) => {
    if (!v) { return false }
    return v.length <= n || `input must be less than ${n} characters`
  },
  min: (v, n) => {
    if (!v) { return false }
    return v >= n || `input must be greater than ${n}`
  },
  max: (v, n) => {
    if (!v) { return false }
    return v.length <= n || `input must be less than ${n}`
  },
  email: (v) => {
    if (v.length < 1) { return true || '' }

    const val = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/.test(v)
    return val || 'Invalid Email Format'
  }

}

const Misc = {

  isEmpty: (obj) => {
    if (obj) {
      if (Array.isArray(obj)) {
        return obj.length < 1
      }
      return Object.keys(obj).length === 0
    } return false
  },

  dateFormat (date) {
    const _date = new Date(date)
    return _date.toLocaleDateString()
  }
}

export { Rules, Misc }
