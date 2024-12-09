import ErrorsList from './index'

export default {
  title: 'Components/ErrorsList',
  component: ErrorsList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    errors: {
      name: 'Name is required',
      age: 'Age must be a number',
      address: {
        street: 'Street is required',
        city: 'City is required'
      }
    }
  },
  argTypes: {
    errors: {
      control: 'object',
      description: 'The errors object'
    },
    bordered: {
      control: 'boolean',
      description: 'Whether the list should have a border or not',
      table: {
        type: { summary: 'boolean' }
      }
    }
  }
}

export const Basic = {}

export const Bordered = {
  args: {
    bordered: true
  }
}
