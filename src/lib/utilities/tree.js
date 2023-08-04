import { message } from 'antd'

class UpdateNodeError extends Error {}

const findNode = (collection, identifier, identifyBy = 'id') => {
  let current = null

  for (const [_index, node] of collection.entries()) {
    if (node[identifyBy] == identifier) {
      current = node
      break
    }

    if (node.children) {
      current = findNode(node.children, identifier, identifyBy)
      if (current) {
        break
      }
    }
  }

  return current
}

const tryUpdateNode = (...updatePayload) => {
  try {
    return updateNode(...updatePayload)
  } catch (e) {
    if (e instanceof UpdateNodeError) {
      message.error(e.message)
      return
    }

    throw e
  }
}

const updateNode = (collection, identifier, identifyBy = 'id', values, condition = null) => {
  return collection.map((node) => {
    if (node[identifyBy] == identifier) {
      ensureSatisfiesCondition(node, values, condition)
      node = { ...node, ...values }
    } else if (node.children) {
      node.children = updateNode(node.children, identifier, identifyBy, values, condition)
    }

    return node
  })
}

const deleteNode = (collection, identifier, identifyBy = 'id') => {
  const atRoot = collection.find((node) => node[identifyBy] == identifier)

  if (atRoot) {
    return collection.filter((node) => node[identifyBy] != identifier)
  } else {
    return collection.map((node) => {
      if (node.children) {
        node.children = deleteNode(node.children, identifier, identifyBy)
      }

      return node
    })
  }
}

const ensureSatisfiesCondition = (node, values, condition) => {
  if (!condition) {
    return
  }

  const conditionResult = condition(node, values)

  if (conditionResult === true) {
    return
  }

  throw new UpdateNodeError(`Could not update node: ${conditionResult}`)
}

export default { findNode, tryUpdateNode, updateNode, deleteNode }
