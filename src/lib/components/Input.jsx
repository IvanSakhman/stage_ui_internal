import { useRef, useEffect } from 'react'
import { Input as AntdInput, InputNumber } from 'antd'

// export interface Props extends HTMLProps<HTMLInputElement> {
//   error?: boolean
//   className?: string
//   name?: string
//   type?: string
//   placeholder?: string
//   required?: boolean
// }

const Input = ({ children, error, className, component = AntdInput, ...rest }) => {
  const input = useRef(null)
  const classNames = []

  if (error) {
    classNames.push('ant-form-item-has-error')
  }

  if (className) {
    classNames.push(className)
  }

  useEffect(() => {
    // Needs this as defaultValue is onrender only and when it comes later on is not applied.
    if (input.current && rest.defaultValue) {
      if (input.current.state.value != rest.defaultValue) {
        input.current.setState({ value: rest.defaultValue })
      }
    }
  }, [input, rest])

  const InputComponent = component

  return (
    <InputComponent ref={input} className={classNames.join(' ')} {...rest}>
      {children}
    </InputComponent>
  )
}

const TextArea = (props) => <Input component={AntdInput.TextArea} {...props} />

Input.TextArea = TextArea
Input.Number = InputNumber

export default Input
