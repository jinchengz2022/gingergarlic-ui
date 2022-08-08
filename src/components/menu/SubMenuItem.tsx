import React, { FunctionComponentElement, useContext, useState } from 'react';
import classNames from 'classnames'
// import { DownOutlined, UpOutlined } from '@ant-design/icons'
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
  const isOpen = SubmenuContext.mode === 'vertical' && SubmenuContext.defaultOpenMenu?.includes(index);
  const [openOrClose, setOpenOrClose] = useState(isOpen);
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': SubmenuContext.index === index,
    'is-open': openOrClose,
    'is-vertical': SubmenuContext.mode === 'vertical',
  })
  const subMenuClasses = classNames('submenu', {
    'menu-opened': openOrClose
  })
  let timer: any;

  const mouseEvent = (e: React.MouseEvent) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpenOrClose(!openOrClose)
    }, 300);
  }

  const handleClickOpen = SubmenuContext.mode === 'vertical' ? {
    onClick: () => setOpenOrClose(!openOrClose)
  } : {};

  const handleMouseOpen = SubmenuContext.mode === 'vertical' ? {
  } : {
    onMouseEnter: mouseEvent,
    onMouseLeave: mouseEvent
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childEle = child as FunctionComponentElement<MenuItemProps>;
      if (childEle.type.name === 'MenuItem') {
        return React.cloneElement(childEle, { ...childEle.props })
      }
    })
  }

  return (
    <li
      className={classes}
      style={style}
      key={index}
      {...handleMouseOpen}
    >
      <div className='sub-menu-collopse' {...handleClickOpen}>
        <span>{title}</span>
        {/* {SubmenuContext.mode === 'vertical' ? (
          openOrClose ?
            <UpOutlined style={{ fontSize: 12 }} /> :
            <DownOutlined style={{ fontSize: 12 }} />
        ) : null} */}
      </div>
      <ul className={subMenuClasses}>
        {renderChildren()}
      </ul>
    </li>
  )
}
