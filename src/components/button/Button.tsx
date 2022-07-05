import React from 'react';
import classNames from 'classnames';

export type ButtonTypes = 'primary' | 'danger' | 'link' | 'default';

export type ButtonSize = 'lg' | 'sm';

interface ButtonProps {
  type?: ButtonTypes;
  href?: string;
  disable?: boolean;
  className?: string;
  size?: ButtonSize;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    type,
    href,
    disable,
    children,
    size,
    className,
    ...restProps
  } = props;

  const classes = classNames('btn', className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    'disable': (type === 'link') && href
  })

  if (type === 'link' && href) {
    return <a
      href={href}
      className={classes}
      {...restProps}
    >
      {children}
    </a>
  } else {
    return <button
      disabled={disable}
      className={classes}
      {...restProps}
    >
      {children}
    </button>
  }
}

Button.defaultProps={
  type: 'default',
  size: 'sm'
}
