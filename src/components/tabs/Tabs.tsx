import React, { useState, createContext, FunctionComponentElement } from 'react'
import classNames from 'classnames'

import type { TabsPaneProps } from './TabsPane'

type TabsType = 'edit' | 'default';

interface TabsProps {
  defaultKey?: string | number;
  className?: string;
  style?: React.CSSProperties;
  type?: TabsType;
  children: React.ReactNode;
}

interface TabsContextProps {
  key?: string | number;
  type?: TabsType;
  onSelect?: (key: string | number) => void;
}

export const TabsContext = createContext<TabsContextProps>({ key: 'tab1' })

export const Tabs: React.FC<TabsProps> = ({ defaultKey, className, style, children, type }) => {
  const [currentKey, setCurrentKey] = useState<string | number>();
  const tabsClasses = classNames('tabs', className, {})

  const onSelect = (key: string | number) => {
    setCurrentKey(key)
  }

  const tabsContextValue: TabsContextProps = { key: currentKey ?? (children as FunctionComponentElement<TabsPaneProps>[])[0].props.tabKey as string, onSelect, type }

  /*
    TODO: 当前选中tabs
          li子元素样式
          添加删除功能
  */

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabsPaneProps>;
      return React.cloneElement(childElement, { ...childElement.props, key: childElement.key  })

    })
  }

  return <ul className={tabsClasses} style={style}>
    <TabsContext.Provider value={tabsContextValue}>
      {renderChildren()}
    </TabsContext.Provider>
  </ul>
}

Tabs.defaultProps = {
  type: 'default'
}