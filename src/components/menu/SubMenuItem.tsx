import React, { FunctionComponentElement, useContext, useState } from 'react';
import classNames from 'classnames'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { MenuContext } from './Menu'
import { MenuItemProps } from './MenuItem'

export interface SubMenuItemProps {
  index: string | number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  title: React.ReactNode | string;
}

export const SubMenuItem: React.FC<SubMenuItemProps> = ({ index, className, style, children, title }) => {
  const SubmenuContext = useContext(MenuContext);
  const [openOrClose, setOpenOrClose] = useState(false);
  const classes = classNames('sub-menu-item', className, {
    'is-active': SubmenuContext.index === index && openOrClose,
  })

  const SubmenuItemClick = () => {
    if (SubmenuContext.onSelect) {
      SubmenuContext.onSelect(index);
    }
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childEle = child as FunctionComponentElement<MenuItemProps>;
      if (childEle.type.name === 'MenuItem') {
        return <ul style={{ display: openOrClose ? 'block' : 'none' }}>
          {React.cloneElement(childEle, { ...childEle.props })}
        </ul>
      }
    })
  }

  return (
    <li
      className={classes}
      style={style}
      key={index}
      // onClick={SubmenuItemClick}
    >
      <div className='sub-menu-collopse' onClick={() => setOpenOrClose(!openOrClose)}>
        <span>{title}</span>
        {openOrClose ? <UpOutlined style={{ fontSize: 12 }} /> : <DownOutlined style={{ fontSize: 12 }} />}
      </div>
      {renderChildren()}
    </li>
  )
}
