import buildCrumbs from '~su/components/PageContainer/buildCrumbs'

import { HomeOutlined } from '@ant-design/icons'


describe('buildCrumbs', () => {
  const { location } = window

  const currentPageTitle = 'Test Template'
  beforeAll(() => {
    delete window.location
    window.location = { pathname: '/templating/templates/1/edit' }
  })

  afterAll(() => {
    window.location = location
  })

  it('adds home crumb', () => {
    const buildBreadcrumbNames = () => {}

    expect(buildCrumbs(currentPageTitle, buildBreadcrumbNames, '', '/')[0]).toEqual({
      href: '/',
      title: <HomeOutlined />
    })
  })

  it('builds crumbs based on location', () => {
    expect(buildCrumbs(currentPageTitle).slice(1, -1)).toEqual([
      {
        href: '/templating',
        title: 'Templating'

      },
      {
        href: '/templating/templates',
        title: 'Templates'
      },
      {
        href: '/templating/templates/1',
        title: '1'
      }
    ])
  })

  it('changes breadcrumbs names if buildBreadcrumbNames is passed', () => {
    const buildBreadcrumbNames = (defaultName) => `${defaultName} Crumb Name`

    expect(buildCrumbs(currentPageTitle, buildBreadcrumbNames).slice(1, -1)).toEqual([
      {
        href: '/templating',
        title: 'Templating Crumb Name'

      },
      {
        href: '/templating/templates',
        title: 'Templates Crumb Name'
      },
      {
        href: '/templating/templates/1',
        title: '1 Crumb Name'
      }
    ])
  })

  it('adds currentPath crumb', () => {
    expect(buildCrumbs(currentPageTitle).at(-1)).toEqual({
      title: currentPageTitle
    })
  })

  it('changes currentPath breadcrumb name if buildBreadcrumbNames is passed', () => {
    const buildBreadcrumbNames = (defaultName) => `${defaultName} Crumb Name`

    expect(buildCrumbs(currentPageTitle, buildBreadcrumbNames).at(-1)).toEqual({
      title: 'Test Template Crumb Name'
    })
  })
})
