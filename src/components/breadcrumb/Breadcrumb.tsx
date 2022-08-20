import React, { FC, FunctionComponentElement } from 'react';
import classNames from 'classnames';

export interface BreadcrumbProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** 父组件分隔符优先级高于子组件 */
  separator?: React.ReactNode;
  /** 默认选择的面包屑 */
  defaultIndex?: string | number;
}

export interface BreadcrumbContextProp {
  index: string | number;
  itemCick: (index: string | number) => void;
}

export const BreadcrumbCreateContext = React.createContext<BreadcrumbContextProp>({ index: 0, itemCick: () => { } });

export const Breadcrumb: FC<BreadcrumbProps> = ({ children, className, style, separator, defaultIndex }) => {
  const [currentIndex, updateCurrentIndex] = React.useState(defaultIndex ?? 0);

  const updateIndex = (index: string | number) => {
    updateCurrentIndex(index)
  }

  const BreadcrumbContext: BreadcrumbContextProp = {
    index: currentIndex,
    itemCick: updateIndex
  };



  const childrenNode = () => {
    const childrenLength = React.Children.count(children);

    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<
        BreadcrumbProps & { lastChild: boolean; index?: string | number; }
      >;
      const { name } = childElement.type;
      if (name === 'BreadcrumbItem') {
        return React.cloneElement(
          childElement,
          {
            ...childElement.props,
            separator: separator ?? childElement.props.separator,
            index: childElement.props.index ?? index,
            lastChild: childrenLength - 1 === index
          })
      } else {
        console.error('Breadcrumb children must be BreadcrumbItem Component!')
      }
    })
  }

  const classes = classNames('breadcrumb', className, style);

  return (
    <ul className={classes}>
      <BreadcrumbCreateContext.Provider value={BreadcrumbContext}>
        {childrenNode()}
      </BreadcrumbCreateContext.Provider>
    </ul>
  )
}