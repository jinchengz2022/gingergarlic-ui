import { FC } from 'react';
import type { MenuProps } from './Menu'
import type { MenuItemProps } from './MenuItem'
import type { SubMenuItemProps } from './SubMenuItem'
import { Menu as OriginMenu } from './Menu'
import { MenuItem } from './MenuItem'
import { SubMenuItem } from './SubMenuItem'

type OriginMenuProp = FC<MenuProps> & { Item: FC<MenuItemProps>; SubMenu: FC<SubMenuItemProps> }

const Menu: OriginMenuProp = OriginMenu as OriginMenuProp;

Menu.Item = MenuItem;
Menu.SubMenu = SubMenuItem;

export default Menu;