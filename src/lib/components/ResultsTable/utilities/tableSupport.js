import { array } from '~su/utilities'

export const normalizeResults = (results) => {
  if (!results?.length > 0) {
    return []
  }

  const arrayOfArrays = Array.isArray(results[0])

  if (arrayOfArrays) {
    const headers = results[0]
    results = results.slice(1).map((row) => Object.fromEntries(array.zip(headers, row)))
  }

  return results.map((row, index) => ({ key: index, ...row }))
}

export const buildFromResults = (results) => {
  if (!results?.length > 0) {
    return []
  }

  return Object.keys(results[0])
    .filter((column) => column !== 'key')
    .map((column) => columnConfig(column))
}

export const columnConfig = (column) => {
  return {
    title: column,
    key: column,
    render: (value) => (value === null ? value : value.toString()),
    width: 200
  }
}
