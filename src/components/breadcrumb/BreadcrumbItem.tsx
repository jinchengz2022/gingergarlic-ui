import React, { FC } from 'react'
import classNames from 'classnames'

import { BreadcrumbCreateContext } from './Breadcrumb'

export interface BreadcrumbItemProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  separator?: React.ReactNode;
  disabled?: boolean;
  index?: string | number;
  onClick?: () => void;
}

export const BreadcrumbItem: FC<BreadcrumbItemProps> = props => {
  const { children, className, style, separator, icon, ...rest } = props as BreadcrumbItemProps & { lastChild: boolean };
  const { index, itemCick } = React.useContext(BreadcrumbCreateContext);
  const itemIndex = rest.index ?? 0

  const classes = classNames('breadcrumb-item', className, style, {
    'breadcrumb-item-active': itemIndex === index
  })

  const handleClick = () => {
    itemCick(rest.index!)
  }

  return (
    <li
      className={classes}
      key={itemIndex}
      onClick={handleClick}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
      {
        !rest.lastChild && (
          <span className='breadcrumb-item-separator'>
            {separator ?? '/'}
          </span>
        )
      }
    </li>
  )
}