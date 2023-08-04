import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Steps, Progress, Typography } from 'antd'
import { LoadingOutlined, SmileOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import string from '~su/utilities/string'
import object from '~su/utilities/object'

import { MEDIA } from '~su/constants/mediaQueries'
import Button from './Button'
import Tooltip from './Tooltip'

// type Props = {
//   id: integer
//   state: string
//   steps: any[]
// }

const GhostLink = styled(Typography.Link)`
  &:not(:hover) {
    color: inherit !important;
  }
`

const StepContent = styled.div`
  padding: 16px 50px;
  margin-top: 16px;
  background-color: #fafafa;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;

  .ant-table-wrapper {
    width: 50%;
    margin: 0 auto;
  }
`

const StyledSteps = styled(Steps)`
  .ant-steps-item-description {
    position: absolute;
    top: 0;
    right: 50%;
    bottom: 0;
    left: 50%;
    width: 96px;
    background: white;
    text-align: center;

    .ant-btn span:not(.anticon) {
      display: none;

      ${MEDIA.screen.xl} {
        display: inline-block;
      }
    }
  }
`

const DynamicSteps = ({ state, steps, refresh = {} }) => {
  const [current, updateCurrent] = useState({ index: 0, status: 'process' })
  const [displayingContentOf, setDisplayingContentOf] = useState(null)

  useEffect(() => {
    const currentStep = steps.find((step) => step.states.includes(state)),
      currentStepIndex = steps.indexOf(currentStep)
    let status
    switch (state) {
      case String(state?.match(/^failed.*/)):
      case 'cancelled':
        status = 'error'
        break
      case 'finished':
      case 'completed':
        status = 'finish'
        break
      default:
        status = 'process'
    }

    updateCurrent({ index: currentStepIndex, status: status })
  }, [state])

  const buildStep = ({ title, errorTitle, ...rest }, index) => {
    const extraOpts = {}

    if (current.index == index && current.status == 'finish') {
      extraOpts.icon = <SmileOutlined />
    }

    if (current.index == index && current.status == 'process') {
      if (refresh.prompt) {
        extraOpts.description = <Button.Reload onClick={refresh.onClick} disabled={refresh.isLoading} size="small" />
      }

      if (rest.percent) {
        extraOpts.icon = (
          <div className="ant-steps-progress-icon">
            <Progress
              type="circle"
              percent={rest.percent}
              width={26}
              strokeWidth={8}
              style={{ verticalAlign: 'bottom' }}
              format={(val) => parseInt(val) + '%'}
            />
          </div>
        )
      } else {
        extraOpts.icon = <LoadingOutlined />
      }
    }

    if (current.index == index && current.status == 'error') {
      title = string.humanize(errorTitle ? errorTitle(state) : `${state} ${title}`, { capitalize: true })
    }

    if (rest.content && current.index >= index) {
      title = (
        <Tooltip title="Display details" size="small">
          <GhostLink
            onClick={() =>
              displayingContentOf == index ? setDisplayingContentOf(null) : setDisplayingContentOf(index)
            }
          >
            {title}
            <div className="ant-steps-item-subtitle" style={{ color: 'inherit' }}>
              {displayingContentOf == index ? <CaretUpOutlined /> : <CaretDownOutlined />}
            </div>
          </GhostLink>
        </Tooltip>
      )
    }

    return {
      title: title,
      ...extraOpts
    }
  }

  const stepsProps = object.compact({
    current: current.index,
    status: current.status,
    size: 'small'
  })

  return (
    <>
      <StyledSteps {...stepsProps} items={steps.map(buildStep)} />
      {displayingContentOf ? <StepContent>{steps[displayingContentOf]?.content}</StepContent> : null}
    </>
  )
}

DynamicSteps.propTypes = {
  state: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      states: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      title: PropTypes.string.isRequired,
      errorTitle: PropTypes.func
    })
  ).isRequired,
  refresh: PropTypes.shape({
    prompt: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  })
}

export default DynamicSteps
