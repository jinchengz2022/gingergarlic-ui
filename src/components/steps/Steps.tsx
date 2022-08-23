import React, { FC, FunctionComponentElement } from 'react';
import classNames from 'classnames';

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

  const classes = classNames('steps', className, {});

  const childrenNode = () => {
    return React.Children.map(children, (child, index) => {
      const childrenLen = React.Children.count(children);
      const curNode = child as FunctionComponentElement<StepsProps & { index: number; childrenLen: number; }>
      const { name } = curNode.type;
      if (name === 'Step') {
        return React.cloneElement(curNode, {
          ...curNode.props, defaultCurrent, index, childrenLen, current
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
