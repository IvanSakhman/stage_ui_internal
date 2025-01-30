import { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { TimePicker as AntdTimePicker } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const TimePicker = ({ value, format = 'HH:mm', onChange, placeholder = 'Select time', ...props }) => {
  const [isInvalid, setIsInvalid] = useState(false)

  useEffect(() => {
    if (value) {
      setIsInvalid(!dayjs(value, format, true).isValid())
    }
  }, [value, format])

  const handleChange = (time, timeString) => {
    if (timeString && !dayjs(timeString, format, true).isValid()) {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
      onChange?.(time, timeString)
    }
  }

  const formattedValue = useMemo(
    () => (value && dayjs(value, format, true).isValid() ? dayjs(value, format, true) : null),
    [value, format]
  )

  return (
    <AntdTimePicker
      value={formattedValue}
      format={format}
      onChange={handleChange}
      placeholder={isInvalid ? 'Please enter a valid time' : placeholder}
      {...props}
      {...(isInvalid ? { status: 'error' } : {})}
    />
  )
}

TimePicker.propTypes = {
  value: PropTypes.string,
  format: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
}

export default TimePicker
