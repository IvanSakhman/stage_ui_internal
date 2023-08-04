import getDefaultMenuKeys from '~su/components/Layout/SideMenu/utilities/getDefaultMenuKeys'

describe('getDefaultMenuKeys', () => {
  const sidebarItems = [
    {
      key: '/templating',
      label: 'Templates',
      icon: 'FolderOutlined',
      children: [
        { key: '/templating/templates', label: 'All Templates' },
        { key: '/templating/templates/new', label: 'New Template' }
      ]
    },
    { key: '/subscriber/subscriptions', label: 'Live Subscriptions', icon: 'AppstoreOutlined' },
    { key: '/subscribing/templates', label: 'Subscribe', icon: 'AppstoreAddOutlined' }
  ]

  it("returns proper keys if no items matches pathname", () => {
    expect(getDefaultMenuKeys({ pathname: '/some-path' }, sidebarItems)).toEqual({
      defaultOpenKeys: [],
      defaultSelectedKey: null
    })
  })

  it("returns proper keys for item without children if pathname matches it's key", () => {
    expect(getDefaultMenuKeys({ pathname: '/subscriber/subscriptions' }, sidebarItems)).toMatchObject({
      defaultOpenKeys: [],
      defaultSelectedKey: '/subscriber/subscriptions'
    })
  })

  it("returns proper keys for item with children, which key exactly matches pathname", () => {
    expect(getDefaultMenuKeys({ pathname: '/templating/templates/new' }, sidebarItems)).toMatchObject({
      defaultOpenKeys: ['/templating'],
      defaultSelectedKey: '/templating/templating/templates/new'
    })
  })

  it("returns proper keys for item with children, which key partially matches pathname", () => {
    expect(getDefaultMenuKeys({ pathname: '/templating/templates/1/edit' }, sidebarItems)).toMatchObject({
      defaultOpenKeys: ['/templating'],
      defaultSelectedKey: '/templating/templating/templates'
    })
  })

  it("returns proper keys for more custom pathname", () => {
    const sidebarItems = [
      {
        key: '/admin/development/groups',
        label: 'Group',
        icon: '',
        children: [
          { key: '/admin/development/groups/new', label: 'Create Group' },
          { key: '/admin/development/groups', label: 'All Groups' }
        ]
      }
    ]

    expect(getDefaultMenuKeys({ pathname: '/admin/development/groups/1/manage' }, sidebarItems)).toEqual({
      defaultOpenKeys: ['/admin/development/groups'],
      defaultSelectedKey: '/admin/development/groups/admin/development/groups'
    })
  })

  it("returns proper keys for tree-like side items menu format", () => {
    const sidebarItems = [
      {
        key: '/admin/development/groups',
        label: 'Group',
        icon: '',
        children: [
          {
            key: '/admin/development/groups/custom-groups',
            label: 'All Groups',
            children: [
              { key: '/admin/development/groups/custom-groups/new', label: 'Create Group' },
              { key: '/admin/development/groups/custom-groups/manage', label: 'Manage' }
            ]
          }
        ]
      }
    ]

    expect(getDefaultMenuKeys({ pathname: '/admin/development/groups/custom-groups/manage' }, sidebarItems)).toMatchObject({
      defaultOpenKeys: ['/admin/development/groups', '/admin/development/groups/admin/development/groups/custom-groups'],
      defaultSelectedKey: '/admin/development/groups/admin/development/groups/custom-groups/admin/development/groups/custom-groups/manage'
    })
  })

  it("set item which has children as expanded and selected at the same time if pathname equals its key", () => {
    const sidebarItems = [
      {
        key: '/admin/development/groups',
        label: 'Group',
        icon: '',
        children: [
          {
            key: '/admin/development/groups/custom-groups',
            label: 'All Groups',
            children: [
              { key: '/admin/development/groups/custom-groups/new', label: 'Create Group' },
              { key: '/admin/development/groups/custom-groups/manage', label: 'Manage' }
            ]
          }
        ]
      }
    ]

    expect(getDefaultMenuKeys({ pathname: '/admin/development/groups/custom-groups' }, sidebarItems)).toMatchObject({
      defaultOpenKeys: ['/admin/development/groups', '/admin/development/groups/admin/development/groups/custom-groups'],
      defaultSelectedKey: '/admin/development/groups/admin/development/groups/custom-groups'
    })
  })

  it("sets all parents to defaultOpenKeys up to latest child, which has same key as parent", () => {
    const sidebarItems = [
      {
        key: '/admin/development/groups/custom-groups',
        label: 'Group',
        icon: '',
        children: [
          {
            key: '/admin/development/groups/custom-groups',
            label: 'All Groups',
            children: [
              { key: '/admin/development/groups/custom-groups', label: 'Custom Groups' }
            ]
          }
        ]
      }
    ]

    expect(getDefaultMenuKeys({ pathname: '/admin/development/groups/custom-groups' }, sidebarItems)).toMatchObject({
      defaultOpenKeys: [
        '/admin/development/groups/custom-groups',
        '/admin/development/groups/custom-groups/admin/development/groups/custom-groups',
      ],
      defaultSelectedKey: '/admin/development/groups/custom-groups/admin/development/groups/custom-groups/admin/development/groups/custom-groups'
    })
  })

  it("returns proper open and selected keys even if child key doesn't contain full parent key", () => {
    const sidebarItems = [
      {
        key: '/admin/development/parent',
        label: 'Parent',
        icon: '',
        children: [
          {
            key: '/admin/development/child',
            label: 'Child',
            children: [
              { key: '/admin/development/sub-child', label: 'Sub Child' }
            ]
          }
        ]
      }
    ]

    expect(getDefaultMenuKeys({ pathname: '/admin/development/sub-child' }, sidebarItems)).toMatchObject({
      defaultOpenKeys: [
        '/admin/development/parent',
        '/admin/development/parent/admin/development/child',
      ],
      defaultSelectedKey: '/admin/development/parent/admin/development/child/admin/development/sub-child'
    })
  })
})
