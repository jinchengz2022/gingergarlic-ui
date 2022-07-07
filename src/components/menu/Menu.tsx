import React, { createContext, useState } from 'react'
import clssNames from 'classnames'

type MenuMode = 'vertical' | 'horizontal';

interface MenuProps {
  onSelect?: (selectKey: number | string) => void; // 选择项
  defaultSelectKey?: number | string; // 默认选择项
  defaultOpenKeys?: number | string; // 默认选择项
  mode?: MenuMode; // 纵向 横向
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

interface MenuContext {
  index: number | string;
  onSelect?: (selectKey: number | string) => void;
}

export const MenuContext = createContext<MenuContext>({ index: '1' });

export const Menu: React.FC<MenuProps> = (props) => {
  const {
    onSelect,
    defaultSelectKey,
    defaultOpenKeys,
    mode,
    style,
    className,
    children
  } = props;
  const [currentIndex, setCurrentIndex] = useState(defaultSelectKey);

  const menuSelect = (index: number | string) => {
    if(onSelect) {
      onSelect(index);
      setCurrentIndex(index);
    }
  }

  const menuDefaultContext: MenuContext = {
    index: currentIndex ?? 0,
    onSelect: menuSelect
  }

  const classes = clssNames('menu', className, {
    [`menu-mode-${mode}`]: mode
  })

  return <ul className={classes} style={style}>
    <MenuContext.Provider value={menuDefaultContext}>
      {children}
    </MenuContext.Provider>
  </ul>
}

Menu.defaultProps = {
  mode: 'vertical'
}