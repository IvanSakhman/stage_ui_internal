import * as store from './root-store'
import { init, showModal, hideModal, triggerGlobalAlert } from './actions'

export default { init, showModal, hideModal, triggerGlobalAlert, ...store }
