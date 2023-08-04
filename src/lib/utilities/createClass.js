export default (properties) => {
  return class {
    constructor(values = {}) {
      for (const [property, defaultValue] of Object.entries(properties)) {
        this[property] = values[property] || defaultValue
      }
    }
  }
}
