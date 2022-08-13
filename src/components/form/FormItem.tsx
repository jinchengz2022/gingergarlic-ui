import React, { ReactNode, FC, ReactElement } from 'react';
import classNames from 'classnames';

export interface FormItemProps {
  children?: ReactNode;
  label?: string;
  name?: string | string[];
  colon?: boolean;
}

export const FormItem: FC<FormItemProps> = ({ children, label, colon }): ReactElement<any, any> | null => {

  const classes = classNames('form-item', {
    [`form-item-no-label`]: !label,
  })

  return (
    <div className={classes}>
      {label && (
        <div className='form-item-label form-item-colon'>
          <label title={label}>
            {label}
            {colon && <span>&nbsp;:&nbsp;</span>}
          </label>
        </div>
      )}
      <div className='form-item-ele'>{children}</div>
    </div>
  )
}