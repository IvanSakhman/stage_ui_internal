import { Input } from '~su/components'

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const fields = [
  {
    item: {
      name: 'email',
      label: 'Email',
      rules: [
        {
          required: true,
          message: 'Please enter your email'
        },
        {
          pattern: emailPattern,
          message: 'Please enter a valid email address'
        }
      ]
    },
    component: <Input size="large" placeholder="Log in to with email" />
  },
  {
    item: {
      name: 'password',
      label: 'Password',
      rules: [{ required: true, message: 'Please enter your password' }]
    },
    component: <Input size="large" type="password" placeholder="Log in to with password" />
  }
]

export default fields
