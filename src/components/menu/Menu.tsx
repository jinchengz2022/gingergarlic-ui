import React, { createContext, FunctionComponentElement, useState } from 'react'
import clssNames from 'classnames'

import type { MenuItemProps } from './MenuItem'

type MenuMode = 'vertical' | 'horizontal';

interface MenuProps {
  onSelect?: (selectKey: number | string) => void; // 选择项
  defaultSelectKey?: number | string; // 默认选择项
  defaultOpenKeys?: number | string; // 默认选择项
  mode?: MenuMode; // 纵向 横向
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  defaultOpenMenu?: (string | number)[];
}

interface MenuContext {
  index: number | string;
  onSelect?: (selectKey: number | string) => void;
  defaultOpenMenu?: (string | number)[];
  mode?: MenuMode;
}

export const MenuContext = createContext<MenuContext>({ index: '1', mode: 'vertical', defaultOpenMenu: ['1'] });

export const Menu: React.FC<MenuProps> = (props) => {
  const {
    onSelect,
    defaultSelectKey,
    defaultOpenKeys,
    defaultOpenMenu,
    mode,
    style,
    className,
    children
  } = props;
  const [currentIndex, setCurrentIndex] = useState(defaultSelectKey);

  const menuSelect = (index: number | string) => {
    if (onSelect) {
      onSelect(index);
      setCurrentIndex(index);
    }
  }

  const menuDefaultContext: MenuContext = {
    index: currentIndex ?? 0,
    onSelect: menuSelect,
    mode: mode,
    defaultOpenMenu
  }

  const classes = clssNames('menu', className, {
    [`menu-${mode}`]: mode
  })

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { name } = childElement.type;

      if (name === 'MenuItem' || name === 'SubMenuItem') {
        return React.cloneElement(childElement, { ...childElement.props })
      } else {
        console.error('Warning: Menu children must is MenuItem component');
      }
    })
  }


  return <ul className={classes} style={style}>
    <MenuContext.Provider value={menuDefaultContext}>
      {renderChildren()}
    </MenuContext.Provider>
  </ul>
}

Menu.defaultProps = {
  mode: 'vertical'
}