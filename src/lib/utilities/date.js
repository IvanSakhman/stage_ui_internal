import humanizeDuration from 'humanize-duration'
import object from './object'
import dayjs from 'dayjs'

// type TimeBetweenArgs = {
//   startDate: string
//   endDate?: string
//   humanizeOptions?: object
// }

const isBrowser = typeof window !== 'undefined'

const timeBetween = ({ startDate, endDate = null, humanizeOptions = {} }) => {
  if (!endDate) {
    endDate = new Date()
  }

  const diff = Date.parse(endDate) - Date.parse(startDate)

  if (diff < 0) {
    return 0
  }

  return formatDuration(diff, {
    largest: 3,
    ...humanizeOptions
  })
}

const formatDuration = (duration, humanizeOptions = {}) => {
  return humanizeDuration(duration, {
    largest: 2,
    conjunction: ' and ',
    serialComma: false,
    maxDecimalPoints: 2,
    ...humanizeOptions
  })
}

// format = (value: string)
const format = (value) => {
  if (!value || !isBrowser) {
    return null
  }

  return Intl.DateTimeFormat(navigator.language, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short'
  }).format(Date.parse(value))
}

const detailedFormat = (value, timeZone = null) => {
  if (!value || !isBrowser) {
    return null
  }

  return Intl.DateTimeFormat(
    navigator.language,
    object.compact({
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      fractionalSecondDigits: 3,
      timeZone: timeZone,
      timeZoneName: 'short'
    })
  ).format(Date.parse(value))
}

// https://stackoverflow.com/questions/58216504/dayjs-isvalid-behaves-differently-to-moment/58216985#58216985
const isValidDateWithFormat = (value, format) => dayjs(value, format).format(format) === value

export default { timeBetween, formatDuration, format, detailedFormat, isValidDateWithFormat }
