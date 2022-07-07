import React, { useContext } from 'react';
import classNames from 'classnames'
import { MenuContext } from './Menu'

interface MenuItemProps {
  index: number | string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    index,
    disabled,
    className,
    style,
    children
  } = props;

  const menuItemContext = useContext(MenuContext);

  const classes = classNames('menu-item', className, {
    'is-active': menuItemContext.index === index,
    'is-disabled': disabled
  })

  const menuItemClick = () => {
    if(menuItemContext.onSelect && !disabled) {
      menuItemContext.onSelect(index);
    }
  }

  return <li className={classes} key={index} onClick={menuItemClick} style={style}>
    {children}
  </li>
}