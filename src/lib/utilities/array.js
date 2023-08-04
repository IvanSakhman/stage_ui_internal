const transpose = (array) => array[0].map((_, colIndex) => array.map((row) => row[colIndex]))

const zip = (a, b) => a.map((k, i) => [k, b[i]])

const compact = (array) => array.filter((i) => i)

export default { transpose, zip, compact }
