import React, { FC } from 'react'
import classNames from 'classnames';

export interface StepProps {
  current?: number;
  index?: number;
  childrenLen?: number;
  defaultCurrent?: number;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  state?: 'wait' | 'process' | 'error' | 'finish';
}

export const Step: FC<StepProps> = props => {
  const { children, current, description, title, index, childrenLen, state = 'wait' } = props;

  const [stepCurrent, updateCurrent] = React.useState(current ?? 1);
  const [stepState, updateState] = React.useState(state);

  const classes = classNames('step', {})

  const stepStateClasses = classNames('step-state', `step-${stepState}`)

  const stepDescClasses = classNames('step-desc', {})

  const stepTitleClasses = classNames('step-title', {
    'line': index! < childrenLen! - 1,
    [`step-title-${stepState}`]: true,
    [`line-${stepState}`]: true
  })

  return (
    <div className={classes}>
      <div className={stepStateClasses}>{index! + 1}</div>
      <div className='step-wrapper'>
        <div className={stepTitleClasses}>{title}</div>
        <div className={stepDescClasses}>{description}</div>
      </div>
    </div>
  )
}
