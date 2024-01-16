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
  const [expandedKeys, setExpandedKeys] = useState([])

  const {
    searchable,
    searchComponent = null,
    draggable = false,
    onItemSelect,
    titleRender,
    searchPlaceholder = 'Search',
    noDataMessage = null,
    defaultExpandAll = false
  } = props

  const treeRef = useRef(null)

  useEffect(() => {
    if (props.data) {
      setData(props.data)

      if (defaultExpandAll) {
        setExpandedKeys(props.data.map((node) => node.key))
      }
    }
  }, [props.data, defaultExpandAll])

  const onSearch = (searchValue) => {
    const matches = performSearch(searchValue, props.data.slice())

    setData(matches)
    setExpandedKeys(findMatchedKeys(matches))
  }

  const onDragDrop = (info) => {
    props.onDragDrop(reorderNodes(info, data))
  }

  const allowDrop = ({ dropNode, dropPosition }) => (!dropNode.root && dropPosition > -1 ? true : false)

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
        allowDrop={props.allowDrop ? props.allowDrop : allowDrop}
        onDrop={onDragDrop}
        onSelect={onItemSelect}
        titleRender={titleRender}
        expandedKeys={expandedKeys}
        onExpand={setExpandedKeys}
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
