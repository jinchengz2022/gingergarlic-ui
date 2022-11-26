import React, { useContext, useRef } from 'react'
import classNames from 'classnames'
import { TabsContext } from './Tabs'

export interface TabsPaneProps {
  tabKey: string | number;
  title?: string | number;
  className?: string;
  style?: React.CSSProperties;
  forceRender?: boolean;
  children: React.ReactNode;
}

export const TabsPane: React.FC<TabsPaneProps> = (props) => {
  const { tabKey, title, children, className, style, forceRender = false } = props
  const elementRef = useRef<any>();
  const tabsPaneContext = useContext(TabsContext);
  const tabsPaneClasses = classNames('tabs-pane', className, {
    'is-active': tabsPaneContext.key === tabKey
  })

  const onClickPane = () => {
    if (tabsPaneContext.onSelect) {
      tabsPaneContext.onSelect(tabKey);
    }
  }

  const removeNode = () => {
    elementRef.current.remove();
  }

  return <li
    className={tabsPaneClasses}
    onClick={onClickPane}
    ref={elementRef}
  >
    <div>
      <span>{title}</span>
      {
        // tabsPaneContext.type === 'edit' && <CloseOutlined style={{ fontSize: 10 }} onClick={removeNode} />
      }
    </div>
    {
      tabsPaneContext.key === tabKey && forceRender && (
        <div>
          {children}
        </div>
      )
    }
  </li>
}