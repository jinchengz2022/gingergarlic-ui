import React, { FC, FunctionComponentElement } from 'react';
import classNames from 'classnames';

export interface StepsProps {
  style?: React.CSSProperties;
  className?: string;
  direction?: 'vertical' | 'horizontal';
  current?: number;
  children?: React.ReactNode;
  onChange?: (current: number) => void;
}

export const Steps: FC<StepsProps> = props => {
  const { className, style, direction, current, children, onChange } = props;

  const classes = classNames('steps', className, {});

  const childrenNode = () => {
    return React.Children.map(children, (child) => {
      const curNode = child as FunctionComponentElement<StepsProps>
      const { name } = curNode.type;
      if (name === 'Step') {
        return React.cloneElement(curNode, { current })
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
