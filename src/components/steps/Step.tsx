import React, { FC } from 'react'
import classNames from 'classnames';

export interface StepProps {
  current?: number;
  index?: number;
  childrenLen?: number;
  defaultCurrent?: number;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  state?: 'wait' | 'process' | 'error' | 'finish';
  onChange?: (current: number) => void;
}

export const Step: FC<StepProps> = props => {
  const {
    current,
    description,
    title,
    index,
    childrenLen,
    state = 'wait',
    icon,
    onChange
  } = props;

  const [stepCurrent, updateCurrent] = React.useState(current ?? 1);
  // const [stepState, updateState] = React.useState(state);

  const stepStateClasses = classNames('step-state', {
    'step-finish': index! + 1 < stepCurrent,
    'step-process': (index! + 1 === stepCurrent) ||
      (stepCurrent === 1) ||
      (stepCurrent === childrenLen),
    'step-error': state === 'error',
    'step-wait': index! + 1 > stepCurrent,
  })

  const stepDescClasses = classNames('step-desc', {
    'step-desc-error': state === 'error',
    'step-desc-wait': index! + 1 > stepCurrent,
    'step-desc-finish': index! + 1 < stepCurrent,
  })

  const stepTitleClasses = classNames('step-title', {
    'line': index! < childrenLen! - 1,
    'step-line-wait': index! + 1 > stepCurrent,
    'step-line-error': state === 'error',
    'step-title-error': state === 'error',
    'step-title-wait': index! + 1 > stepCurrent,
    'step-title-finish': index! + 1 < stepCurrent,
  })

  const changeStep = () => {
    if (!onChange) return;
    onChange(index! + 1);
    updateCurrent(index! + 1);
  }

  return (
    <div className='step'>
      {icon ?? <div className={stepStateClasses} onClick={changeStep}>{index! + 1}</div>}
      <div className='step-wrapper'>
        <div className={stepTitleClasses}>{title}</div>
        <div className={stepDescClasses}>{description}</div>
      </div>
    </div>
  )
}
