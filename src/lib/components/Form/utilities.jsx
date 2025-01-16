import { Fragment } from 'react'
import Card from '../Card'

const getContainer = (type) => {
  switch (type) {
    case 'Card':
      return Card
    default:
      return Fragment
  }
}

export default getContainer
