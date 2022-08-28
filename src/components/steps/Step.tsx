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
  direction?: 'vertical' | 'horizontal';
  onChange?: (current: number) => void;
  changeStep?: (c: number) => void;
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
    changeStep
  } = props;

  const stepTitleClasses = classNames('step-title', {
    'line': index! < childrenLen! - 1,
    'step-line-wait': index! + 1 > current!,
  })

  const curState: Record<any, boolean> = {
    'step-finish': state === 'error' ? false : index! + 1 < current!,
    'step-process': state === 'error' ? false : (index! + 1 === current),
    'step-error': state === 'error',
    'step-wait': state === 'error' ? false : index! + 1 > current!,
  };

  const curStateName = Object.keys(curState).filter((s) => curState[s] ?? s);

  const statusObject: Record<string, any> = {
    'step-finish': {
      color: '#fff',
      titleColor: 'rgba(0, 0, 0, .25)',
      backgroundColor: '#1890ff'
    },
    'step-process': {
      border: '1px solid #1890ff',
      titleColor: '#1890ff',
      color: '#1890ff'
    },
    'step-error': {
      border: '1px solid #f00',
      titleColor: '#f00',
      color: '#f00'
    },
    'step-wait': {
      border: '1px solid rgba(0, 0, 0, .25)',
      titleColor: 'rgba(0, 0, 0, .25)',
      color: 'rgba(0, 0, 0, .25)'
    }
  }

  return (
    <div className='step'>
      {icon ?? <div
        className='step-state'
        onClick={() => changeStep!(index! + 1)}
        style={{
          border: statusObject[curStateName[0]]?.border,
          color: statusObject[curStateName[0]]?.color,
          backgroundColor: statusObject[curStateName[0]]?.backgroundColor,
        }}
      >
        {index! + 1}
      </div>}
      {/* <div className='step-vertical-line'></div> */}
      <div className='step-wrapper'>
        <div
          className={stepTitleClasses}
          style={{
            color: statusObject[curStateName[0]]?.titleColor,
          }}
        >{title}</div>
        <div
          style={{
            color: statusObject[curStateName[0]]?.titleColor,
          }}
        >{description}</div>
      </div>
    </div>
  )
}
