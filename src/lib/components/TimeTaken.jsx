import { useEffect, useState } from 'react'
import { date } from '~su/utilities'

const TimeTaken = ({ startDate, endDate = null, humanizeOptions = {} }) => {
  const [timeTaken, setTimeTaken] = useState(date.timeBetween({ startDate, endDate, humanizeOptions }))

  useEffect(() => {
    setTimeout(() => {
      setTimeTaken(date.timeBetween({ startDate, endDate, humanizeOptions }))
    }, 1000)
  }, [timeTaken])

  return timeTaken
}

export default TimeTaken
