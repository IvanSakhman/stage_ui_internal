const build = (data = {}) => ({
  id: null,
  ...data
})

const checkIsNew = (record) => record.id === null

// # NOTE: this is the only place, where we have id 'new' as it comes from URL and have to be in API url so there is no sense switching it back and forth
const checkIfQueryIsNew = (queryId) => queryId === 'new'

export default { build, checkIfQueryIsNew, checkIsNew }
