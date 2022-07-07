import React, { useRef } from 'react'
import classNames from 'classnames';

type BaseAlertProps = 'danger' | 'warning' | 'success' | 'info';

interface AlertProps {
  className?: string;
  alertType?: BaseAlertProps;
  close?: boolean;
  title?: string | undefined;
  content: string;
  icon?: React.ReactNode | undefined;
}

export const Alert: React.FC<AlertProps> = (props) => {
  const {
    className,
    alertType,
    close,
    title,
    content,
    icon
  } = props;

  const alertRef = useRef<any>();

  const classes = classNames('alert', className, {
    [`alert-${alertType}`]: alertType,
  })

  const closeAlert = () => {
    alertRef?.current?.remove();
  }

  return <div className={classes} ref={alertRef}>
    <div className='header'>
      {/* icon图标&标题 */}
      <div className='icon-title'>
        {icon && <span className='icon'>{icon}</span>}
        {title && <span className='title'>{title}</span>}
      </div>
      {/* 关闭按钮 */}
      {
        close && <div className='closeIcon'>
          <span style={{ display: 'block' }} onClick={closeAlert}>X</span>
        </div>
      }
    </div>
    {/* 内容 */}
    <div className='content'>
      {content}
    </div>
  </div>
}

Alert.defaultProps = {
  alertType: 'info',
  close: true
}