import CompanyLogo from './index'

export default {
  title: 'Components/CompanyLogo',
  component: CompanyLogo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    companyName: 'Assembly Global',
    inHeader: false
  },
  argTypes: {
    companyName: {
      control: 'text',
      description: 'The name of the company',
      table: {
        type: { summary: 'string' }
      }
    },
    inHeader: {
      control: 'boolean',
      description: 'Whether the logo is in the header or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
}

export const Basic = {}

export const InHeader = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  args: {
    inHeader: true
  }
}
