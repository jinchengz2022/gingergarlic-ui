import React, { FC, FunctionComponentElement } from 'react';
import classNames from 'classnames';
export interface StepsProps {
  style?: React.CSSProperties;
  /** 当前步骤 */
  current?: number;
  className?: string;
  /** 步骤条方向 */
  direction?: 'vertical' | 'horizontal';
  defaultCurrent?: number;
  children?: React.ReactNode;
  /** 调用时点击可改变步骤条 */
  onChange?: (current: number) => void;
}

export const Steps: FC<StepsProps> = props => {
  const { className, style, direction, defaultCurrent, children, current, onChange } = props;
  const [stepCurrent, updateCurrent] = React.useState(current ?? 1);

  const classes = classNames('steps', className, {});

  const changeStep = (current: number) => {
    if (!onChange) return;
    onChange(current + 1);
    updateCurrent(current + 1);
  }

  const childrenNode = () => React.Children.map(children, (child, index) => {
    const childrenLen = React.Children.count(children);
    const curNode = child as FunctionComponentElement<
      StepsProps & {
        index: number;
        childrenLen: number;
        changeStep: (c: number) => void;
      }
    >
    const { name } = curNode.type;
    if (name === 'Step') {
      return React.cloneElement(curNode, {
        ...curNode.props,
        defaultCurrent,
        index,
        childrenLen,
        current: stepCurrent,
        direction,
        changeStep
      })
    } else {
      console.error('Steps children must be Step Component!')
    }
  })


  return (
    <div className={classes} style={style}>
      {childrenNode()}
    </div>
  )
}
