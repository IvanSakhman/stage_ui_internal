import * as store from './root-store'
import { init, showModal, hideModal, triggerGlobalAlert, removeGlobalAlert } from './actions'

export default { init, showModal, hideModal, triggerGlobalAlert, removeGlobalAlert, ...store }
