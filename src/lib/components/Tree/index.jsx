import { useState, useEffect, useRef, cloneElement } from 'react'
import { Input, Alert } from 'antd'

import object from '~su/utilities/object'

import { onDrop as reorderNodes, performSearch, findMatchedKeys } from './utils'
import { StyledTree } from './index.styled'

// type Props = {
//   items: any[]
//   searchable?: boolean
//   onItemSelect?: Function
// }

const Tree = (props) => {
  const [data, setData] = useState([])

  const {
    searchable,
    searchComponent = null,
    draggable = false,
    onItemSelect,
    titleRender,
    searchPlaceholder = 'Search',
    noDataMessage = null
  } = props

  const treeRef = useRef(null)

  useEffect(() => {
    if (props.data) {
      setData(props.data)
      const rootNodesKeys = props.data.filter((node) => node.expanded).map((node) => node.key)
      treeRef.current.setExpandedKeys(rootNodesKeys)
    }
  }, [props.data])

  const onSearch = (searchValue) => {
    const matches = performSearch(searchValue, props.data.slice())
    treeRef.current.setExpandedKeys(findMatchedKeys(matches))
    setData(matches)
  }

  const onDragDrop = (info) => {
    props.onDragDrop(reorderNodes(info, data))
  }

  const treeProps = object.compact({
    selectedKeys: props.selectedKeys || null
  })

  const renderSearch = () => {
    if (searchComponent) {
      return cloneElement(
        searchComponent,
        {
          onChange: (event) => {
            searchComponent.props.onChange(event)
            onSearch(event.target.value)
          }
        },
        searchComponent.props.children
      )
    }

    return (
      <Input.Search
        disabled={props.data?.length === 0}
        onSearch={onSearch}
        onChange={(event) => onSearch(event.target.value)}
        placeholder={searchPlaceholder}
      />
    )
  }

  const renderTree = () => {
    return (
      <StyledTree
        ref={treeRef}
        draggable={draggable}
        blockNode
        treeData={data}
        allowDrop={({ dropNode, dropPosition }) => (!dropNode.root && dropPosition > -1 ? true : false)}
        onDrop={onDragDrop}
        onSelect={onItemSelect}
        titleRender={titleRender}
        style={{
          maxHeight: 450,
          overflow: 'scroll'
        }}
        {...treeProps}
      />
    )
  }

  const renderNoDataAlert = () => {
    return <Alert type="warning" message={noDataMessage} style={{ marginTop: 4 }} />
  }

  return (
    <div>
      {searchable ? renderSearch() : null}
      {renderTree()}
      {noDataMessage && data.length === 0 ? renderNoDataAlert() : null}
    </div>
  )
}

export default Tree
