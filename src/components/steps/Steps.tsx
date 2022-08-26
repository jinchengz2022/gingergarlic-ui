import React, { FC, FunctionComponentElement } from 'react';
import classNames from 'classnames';

import { Step } from './Step'

export interface StepsProps {
  style?: React.CSSProperties;
  current?: number;
  className?: string;
  direction?: 'vertical' | 'horizontal';
  defaultCurrent?: number;
  children?: React.ReactNode;
  onChange?: (current: number) => void;
}

export const Steps: FC<StepsProps> = props => {
  const { className, style, direction, defaultCurrent, children, current, onChange } = props;
  const [stepCurrent, updateCurrent] = React.useState(current ?? 1);

  const classes = classNames('steps', className, {});

  const changeStep = (c: number) => {
    if (!onChange) return;
    onChange(c + 1);
    updateCurrent(c + 1);
  }

  const childrenNode = () => {
    
    return React.Children.map(children, (child, index) => {
      
      const childrenLen = React.Children.count(children);
      const curNode = child as FunctionComponentElement<StepsProps & { index: number; childrenLen: number; changeStep: (c: number) => void; }>
      const { name } = curNode.type;
      if (name === 'Step') {
        return React.cloneElement(curNode, {
          ...curNode.props, defaultCurrent, index, childrenLen, current: stepCurrent, changeStep
        })
      } else {
        console.error('Steps children must be Step Component!')
      }
    })
  }

  return (
    <div className={classes} style={style}>
      {childrenNode()}
    </div>
  )
}
