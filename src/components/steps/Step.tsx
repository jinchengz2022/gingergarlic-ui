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

  // const [stepState, updateState] = React.useState(state);

  const stepStateClasses = classNames('step-state')

  const stepDescClasses = classNames('step-desc', {
    'step-desc-error': state === 'error',
    'step-desc-wait': index! + 1 > current!,
    'step-desc-finish': index! + 1 < current!,
  })

  const stepTitleClasses = classNames('step-title', {
    'line': index! < childrenLen! - 1,
    'step-line-wait': index! + 1 > current!,
    'step-line-error': state === 'error',
    'step-title-error': state === 'error',
    'step-title-wait': index! + 1 > current!,
    'step-title-finish': index! + 1 < current!,
  })

  // const changeStep = () => {
  //   if (!onChange) return;
  //   onChange(index! + 1);
  //   updateCurrent(index! + 1);
  // }


  const cur = React.useMemo(() => {
    const a: Record<any, boolean> = {
      'step-finish': state === 'error' ? false : index! + 1 < current!,
      'step-process': state === 'error' ? false : (index! + 1 === current),
      'step-error': state === 'error',
      'step-wait': state === 'error' ? false : index! + 1 > current!,
    };
    console.log(a);

    const curState = Object.keys(a).filter((s) => a[s] ?? s);
    return curState
  }, [current!])

  const statusObject: any = {
    'step-finish': {
      color: '#fff',
      backgroundColor: '#1890ff'
    },
    'step-process': {
      border: '1px solid #1890ff',
      color: '#1890ff'
    },
    'step-error': {
      border: '1px solid #f00',
      color: '#f00'
    },
    'step-wait': {
      border: '1px solid rgba(0, 0, 0, .25)',
      color: 'rgba(0, 0, 0, .25)'
    }
  }
  console.log(cur);

  // TODO: 把子元素写成数组形式，current改变才能触发其他元素改变

  return (
    <div className='step'>
      {icon ?? <div
        className={stepStateClasses}
        onClick={() => changeStep!(index! + 1)}
        style={{
          border: statusObject[cur[0]]?.border,
          color: statusObject[cur[0]]?.color,
          backgroundColor: statusObject[cur[0]]?.backgroundColor,
        }}
      >
        {index! + 1}
      </div>}
      <div className='step-wrapper'>
        <div className={stepTitleClasses}>{title}</div>
        <div className={stepDescClasses}>{description}</div>
      </div>
    </div>
  )
}
