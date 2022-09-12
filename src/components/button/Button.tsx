import React from 'react';
import classNames from 'classnames';

// export type ButtonTypes = 'primary' | 'danger' | 'link' | 'default';

// export type ButtonSize = 'lg' | 'sm';

interface BaseButtonProps {
  btnType?: 'primary' | 'danger' | 'link' | 'default';
  href?: string;
  disable?: boolean;
  className?: string;
  size?: 'lg' | 'sm';
  children: React.ReactNode;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    href,
    disable,
    children,
    size,
    className,
    ...restProps
  } = props;

  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disable': (btnType === 'link') && href
  })

  if (btnType === 'link' && href) {
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
  btnType: 'default',
  size: 'sm'
}
