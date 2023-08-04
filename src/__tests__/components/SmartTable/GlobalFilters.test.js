import {render, screen, getNodeText, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import '../../support/matchMedia.mock'

import GlobalFilters from '~su/components/SmartTable/GlobalFilters'

// functions mock
const applyFilters = jest.fn()

const baseProps = {
  applyFilters,
  by_state: ['active', 'paused'],
  by_is_new: [true, false],
  urlParams: new URLSearchParams(),
  filters: {
    by_state: ['active', 'paused'],
    by_is_new: [true, false]
  },
  globalFiltersOptions: { state: 'multi_select', is_new: 'segmented' },
  dataKey: 'templates'
}

describe('GlobalFilters', () => {
  describe('multi_select', () => {
    const props = {
      ...baseProps
    }

    it('should render correctly', () => {
      render(<GlobalFilters {...props} />)
      expect(screen.getByText('All states')).toBeInTheDocument()
    })

    describe('when no filters provided', () => {
      const props = {
        ...baseProps,
        filters: {}
      }

      it('should render "All states" option', () => {
        render(<GlobalFilters {...props} />)
        expect(screen.getByText('All states')).toBeInTheDocument()
      })
    })

    describe('when filter is applied', () => {
      const search = '?by_state=active&page=1'
      const props = {
        ...baseProps,
        urlParams: new URLSearchParams(search)
      }

      it('should render selected filter', () => {
        render(<GlobalFilters {...props} />)
        expect(screen.getByText('active')).toBeInTheDocument()
      })

      it('should not render "All states" option', () => {
        render(<GlobalFilters {...props} />)
        expect(screen.queryByText('All states')).not.toBeInTheDocument()
      })

      describe('when all filters are selected', () => {
        const search = '?by_state=active,paused&page=1'
        const props = {
          ...baseProps,
          urlParams: new URLSearchParams(search)
        }

        it('should render all options', () => {
          render(<GlobalFilters {...props} />)
          expect(screen.getByText('active')).toBeInTheDocument()
          expect(screen.getByText('paused')).toBeInTheDocument()
        })
      })

      describe('when wrong filter is applied', () => {
        const search = '?by_state=wrong&page=1'
        const props = {
          ...baseProps,
          urlParams: new URLSearchParams(search)
        }

        it('should render "All states" option', () => {
          render(<GlobalFilters {...props} />)
          expect(screen.getByText('All states')).toBeInTheDocument()
        })
      })
    })
  })

  describe('segmented', () => {
    const props = {
      ...baseProps
    }

    const itRendersLabelCorrectly = (container) => {
      const segmentedLabel = container.querySelector("label[for='templates-global-filters-form_is_new']")
      expect(segmentedLabel).toBeInTheDocument()
      expect(getNodeText(segmentedLabel)).toEqual('Is new')
    }

    const itRendersInputsContainer = (container) => {
      const inputsContainer = container.querySelector('#templates-global-filters-form_is_new.ant-segmented')
      expect(inputsContainer).toBeInTheDocument()
    }

    const itRendersItemsCorrectly = (container, expectedCount, expectedTexts = []) => {
      const inputs = container.querySelectorAll(
        '#templates-global-filters-form_is_new.ant-segmented .ant-segmented-item-label'
      )

      expect(inputs.length).toEqual(expectedCount)

      for (let [index, expectedText] of expectedTexts.entries()) {
        expect(getNodeText(inputs[index])).toEqual(expectedText)
      }
    }

    it('should render correctly', () => {
      const { container } = render(<GlobalFilters {...props} />)

      itRendersLabelCorrectly(container)

      itRendersInputsContainer(container)

      itRendersItemsCorrectly(container, 3, ['All', 'Yes', 'No'])
    })

    describe('when no filters provided', () => {
      const props = {
        ...baseProps,
        filters: {}
      }

      it('should only render "All" option', () => {
        const { container } = render(<GlobalFilters {...props} />)

        itRendersLabelCorrectly(container)

        itRendersInputsContainer(container)

        itRendersItemsCorrectly(container, 1, ['All'])
      })
    })

    describe('when filter is applied', () => {
      const search = '?by_is_new=true&page=1'
      const props = {
        ...baseProps,
        urlParams: new URLSearchParams(search)
      }

      it('should render selected filter', () => {
        const { container } = render(<GlobalFilters {...props} />)

        itRendersLabelCorrectly(container)

        itRendersInputsContainer(container)

        itRendersItemsCorrectly(container, 3, ['All', 'Yes', 'No'])

        const selectedItem = container.querySelector(
          '#templates-global-filters-form_is_new.ant-segmented .ant-segmented-item-selected div'
        )
        expect(selectedItem).toBeInTheDocument()
        expect(getNodeText(selectedItem)).toEqual('Yes')
      })

      describe('when wrong filter is applied', () => {
        const search = '?by_is_new=wrong&page=1'
        const props = {
          ...baseProps,
          urlParams: new URLSearchParams(search)
        }

        it('does not mark any option as selected', () => {
          const { container } = render(<GlobalFilters {...props} />)

          itRendersLabelCorrectly(container)

          itRendersInputsContainer(container)

          itRendersItemsCorrectly(container, 3, ['All', 'Yes', 'No'])

          const selectedItem = container.querySelector(
            '#templates-global-filters-form_is_new.ant-segmented .ant-segmented-item-selected'
          )
          expect(selectedItem).not.toBeInTheDocument()
        })
      })
    })
  })
})
