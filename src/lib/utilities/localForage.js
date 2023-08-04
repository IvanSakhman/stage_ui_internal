import localforage from 'localforage'

// setItem = (name: string, value: any, onSuccess?: Function)
const setItem = (name, value, onSuccess) => {
  return localforage
    .setItem(name, value)
    .then(onSuccess)
    .catch((error) => console.error(error))
}

// getItem = (name: string, onSuccess?: Function)
const getItem = (name, onSuccess) => {
  return localforage
    .getItem(name)
    .then(onSuccess)
    .catch((error) => console.error(error))
}

// removeItem = (name: string, onSuccess?: Function)
const removeItem = (name, onSuccess) => {
  return localforage
    .removeItem(name)
    .then(onSuccess)
    .catch((error) => console.error(error))
}

export default { setItem, getItem, removeItem }
