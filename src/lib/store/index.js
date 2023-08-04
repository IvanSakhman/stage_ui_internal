import * as store from './root-store'
import { init, showModal, hideModal } from './actions'

export default { init, showModal, hideModal, ...store }
