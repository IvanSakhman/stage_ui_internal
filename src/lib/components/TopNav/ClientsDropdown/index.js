import { useState, useEffect } from 'react'

import PropTypes from 'prop-types'

import { Input } from 'antd'

import ButtonRoleLink from '~su/components/ButtonRoleLink'

import { StyledClientsMenu } from './index.styled'

const ClientsDropdown = ({
  clients,
  currentClient,
  title = 'Choose Client',
  isButtonRole,
  disabledOverflow = false
}) => {
  const [visibleClients, setVisibleClients] = useState([])

  const availableClients = () => clients?.available.filter((client) => client.name != currentClient?.name)

  useEffect(() => {
    setVisibleClients(availableClients())
  }, [clients, currentClient]) // eslint-disable-line react-hooks/exhaustive-deps

  if (clients === undefined) {
    return null
  }

  const filterVisibleClients = (value) => {
    setVisibleClients(
      availableClients().filter((client) => {
        return new RegExp(value, 'i').test(client.display_name) || new RegExp(value, 'i').test(client.name)
      })
    )
  }

  const clientsItems = visibleClients.map((client, index) => {
    return {
      key: index,
      label: (
        <ButtonRoleLink isButtonRole={isButtonRole} url={`${clients.path.replace(':id', client.name)}`}>
          {client.display_name}
        </ButtonRoleLink>
      )
    }
  })

  const items = [
    {
      key: 'trigger',
      label: currentClient ? currentClient.display_name : title,
      disabled: availableClients().length === 0,
      children: [
        {
          key: 'search',
          disabled: true,
          label: <Input.Search placeholder="Search for client" allowClear onSearch={filterVisibleClients} />
        },
        ...clientsItems
      ]
    }
  ]

  return (
    <StyledClientsMenu
      mode="horizontal"
      items={items}
      triggerSubMenuAction="click"
      disabledOverflow={disabledOverflow}
    />
  )
}

const clientType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  display_name: PropTypes.string.isRequired
})

ClientsDropdown.propTypes = {
  clients: PropTypes.shape({
    available: PropTypes.arrayOf(clientType).isRequired,
    path: PropTypes.string.isRequired
  }),
  currentClient: clientType,
  isButtonRole: PropTypes.bool,
  title: PropTypes.string,
  disabledOverflow: PropTypes.bool
}

export default ClientsDropdown
