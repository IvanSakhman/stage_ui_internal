import PropTypes from 'prop-types'
import { Rate } from 'antd'

const Score = ({ score, availableScoresList }) => {
  if (!score) {
    return null
  }

  const determinedScore = () => {
    if (!availableScoresList) {
      return { value: score }
    }

    return {
      count: availableScoresList.length,
      value: availableScoresList.indexOf(score) + 1,
      tooltips: availableScoresList
    }
  }

  return <Rate disabled {...determinedScore()} />
}

Score.propTypes = {
  score: PropTypes.string,
  availableScoresList: PropTypes.arrayOf(PropTypes.string)
}

export default Score
