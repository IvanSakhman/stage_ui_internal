import { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Steps, Form, Space } from 'antd'
import Divider from '~su/components/Divider'
import ButtonGroup from '~su/components/ButtonGroup'

import string from '~su/utilities/string'

import { StyledControlButton } from './index.styled'

// type Props = {
//   steps: any[]
//   onFinish: Function
// }

const StepForm = forwardRef(({ name, steps, onStepChanged, submitButtons = null, ...formProps }, ref) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [stepForm] = Form.useForm()

  const next = () => {
    stepForm
      .validateFields()
      .then(() => {
        setCurrentStep((current) => current + 1)
        onStepChanged && onStepChanged(currentStep, currentStep + 1)
      })
      .catch(() => null)
  }

  const back = () => {
    setCurrentStep((current) => current - 1)
    onStepChanged && onStepChanged(currentStep, currentStep - 1)
  }

  const renderSubmitButton = (canSubmit) => {
    if (!submitButtons) {
      return (
        <StyledControlButton htmlType="submit" type="primary" disabled={!canSubmit}>
          Submit
        </StyledControlButton>
      )
    }

    return (
      <ButtonGroup>
        {submitButtons.map((submitButtonProps, index) => {
          const { display, submitWith = null, isDisabled, ...buttonProps } = submitButtonProps

          return (
            <StyledControlButton
              key={index}
              {...buttonProps}
              htmlType="button"
              disabled={isDisabled ? isDisabled(!canSubmit) : !canSubmit}
              onClick={() => {
                submitWith ? stepForm.setFieldValue(submitWith.name, submitWith.value) : null
                stepForm.submit()
              }}
            >
              {display}
            </StyledControlButton>
          )
        })}
      </ButtonGroup>
    )
  }

  const stepsComponent = () => {
    if (steps.length === 1) {
      return steps[currentStep].content
    }

    return (
      <>
        <Steps
          current={currentStep}
          style={{ marginBottom: 16 }}
          items={steps.map(({ name }) => ({ title: string.humanize(name, { titleize: true }) }))}
        />
        <Divider key={`step-form-steps-and-content-divider`} />
        {steps[currentStep].content}
      </>
    )
  }

  const getCurrentStepState = (fieldName) =>
    Object.hasOwn(steps[currentStep], fieldName) ? steps[currentStep][fieldName] : true

  const firstStep = currentStep === 0
  const finalStep = currentStep === steps.length - 1
  const canSubmitStep = getCurrentStepState('allowSubmit')
  const canBack = getCurrentStepState('allowBack')
  const canGoNext = !finalStep && canSubmitStep
  const canSubmit = finalStep && canSubmitStep

  const controls = (
    <Form.Item>
      <Space size={0} style={{ width: '100%', justifyContent: 'space-between' }}>
        <StyledControlButton htmlType="button" $hide={firstStep || !canBack} onClick={back}>
          Back
        </StyledControlButton>
        <Space>
          {steps[currentStep].preStepSubmit ? (
            <StyledControlButton
              htmlType="button"
              disabled={steps[currentStep].preStepSubmit.disabled}
              onClick={steps[currentStep].preStepSubmit.handler}
              type="primary-dashed"
            >
              {steps[currentStep].preStepSubmit.cta}
            </StyledControlButton>
          ) : null}
          {canGoNext ? (
            <StyledControlButton htmlType="button" onClick={next} type="primary">
              Next
            </StyledControlButton>
          ) : null}
          {finalStep ? renderSubmitButton(canSubmit) : null}
        </Space>
      </Space>
    </Form.Item>
  )

  return (
    <div>
      <Form ref={ref} name={name} form={stepForm} {...formProps} layout="vertical">
        {stepsComponent()}
        <Divider key={`step-form-stepsComponent-and-controls-divider`} />
        {controls}
      </Form>
    </div>
  )
})

StepForm.propTypes = {
  name: PropTypes.string.isRequired,
  onStepChanged: PropTypes.func,
  submitButtons: PropTypes.arrayOf(
    PropTypes.shape({
      display: PropTypes.string.isRequired,
      submitWith: PropTypes.exact({
        name: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        value: PropTypes.any.isRequired
      }),
      isDisabled: PropTypes.func
    })
  ),
  steps: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      content: PropTypes.element.isRequired,
      allowSubmit: PropTypes.bool,
      allowBack: PropTypes.bool,
      preStepSubmit: PropTypes.exact({
        cta: PropTypes.string.isRequired,
        handler: PropTypes.func.isRequired,
        disabled: PropTypes.bool
      })
    }).isRequired
  ).isRequired
}

export default StepForm
