import React, { useContext, useRef } from 'react'
import classNames from 'classnames'
import { CloseOutlined } from '@ant-design/icons'
import { TabsContext } from './Tabs'

interface TabsPaneProps {
  index: string | number;
  title?: string | number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const TabsPane: React.FC<TabsPaneProps> = (props) => {
  const { index, title, children, className, style } = props
  const elementRef = useRef<any>();
  const tabsPaneContext = useContext(TabsContext);
  const tabsPaneClasses = classNames('tabs-pane', className, {
    'is-active': tabsPaneContext.key === index
  })

  const onClickPane = () => {
    if (tabsPaneContext.onSelect) {
      tabsPaneContext.onSelect(index);
    }
  }

  const removeNode = () => {
    elementRef.current.remove();
  }

  return <li className={tabsPaneClasses} onClick={onClickPane} ref={elementRef}>
    <div>
      <span>{title}</span>
      {
        tabsPaneContext.type === 'edit' && <CloseOutlined style={{ fontSize: 10 }} onClick={removeNode} />
      }
    </div>
    {
      tabsPaneContext.key === index && (
        <div>
          {children}
        </div>
      )
    }
  </li>
}