import humanizeDuration from 'humanize-duration'
import dayjs from 'dayjs'

import object from './object'
import i18n from './i18n'

import canWorkInBrowser from '~su/utilities/canWorkInBrowser'

// type TimeBetweenArgs = {
//   startDate: string
//   endDate?: string
//   humanizeOptions?: object,
//   relative?: bool
// }

const timeBetween = ({ startDate, endDate = null, humanizeOptions = {}, relative = false }) => {
  if (!endDate) {
    endDate = new Date()
  }

  const diff = Date.parse(endDate) - Date.parse(startDate)

  if (diff < 0) {
    return 0
  }

  const formatted = formatDuration(diff, {
    largest: 3,
    ...humanizeOptions
  })

  if (relative) {
    return i18n.t('date.timeBetween.relative', { value: formatted })
  }

  return formatted
}

const formatDuration = (duration, humanizeOptions = {}) => {
  return humanizeDuration(duration, {
    largest: 2,
    conjunction: i18n.t('date.formatDuration.conjuction'),
    serialComma: false,
    maxDecimalPoints: 2,
    language: navigator.language,
    fallbacks: navigator.languages,
    ...humanizeOptions
  })
}

// format = (value: string)
const format = (value) => {
  if (!value || !canWorkInBrowser()) {
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
  if (!value || !canWorkInBrowser()) {
    return null
  }

  return new Intl.DateTimeFormat(
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
  ).format(new Date(value))
}

// https://stackoverflow.com/questions/58216504/dayjs-isvalid-behaves-differently-to-moment/58216985#58216985
const isValidDateWithFormat = (value, format) => dayjs(value, format).format(format) === value

export default { timeBetween, formatDuration, format, detailedFormat, isValidDateWithFormat }
