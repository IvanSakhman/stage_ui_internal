import object from './object'

const transpose = (array) => array[0].map((_, colIndex) => array.map((row) => row[colIndex]))

const zip = (a, b) => a.map((k, i) => [k, b[i]])

const compact = (array) => array.filter((i) => i)

const groupItemsBy = (array, groupBy) => {
  return array.reduce((accumulator, currentValue) => {
    if (!object.isObject(currentValue)) {
      throw new Error(`array.groupItemsBy: ${array} does not contain objects`)
    }

    const groupValue = currentValue[groupBy]

    accumulator[groupValue] ||= []
    accumulator[groupValue].push(currentValue)

    return accumulator
  }, {})
}

const insert = (array, item, index) => {
  return array.reduce((accumulator, currentValue, currentIndex) => {
    currentIndex - index ? accumulator.push(currentValue) : accumulator.push(item, currentValue)
    return accumulator
  }, [])
}

export default { transpose, zip, compact, groupItemsBy, insert }
