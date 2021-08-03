import { Rules, Misc } from '../services/mixins'

import { Controller } from '../services/manager/controller'

export default ({ store, Vue }) => {
  Controller.init(store)
  store.commit('updateUser')
  Vue.config.productionTip = false
  Vue.prototype.Controller = Controller
  Vue.prototype.Rules = Rules
  Vue.prototype.Misc = Misc
}
