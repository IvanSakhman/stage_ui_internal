import store from '~su/store'

const showModalForm = (title, children) => {
  store.showModal({ title, width: '600px', children })
}

export default showModalForm
