import React, { ReactNode, FC, FormHTMLAttributes } from 'react';

export interface MyFormProps extends Omit<FormHTMLAttributes<HTMLElement>, 'children'> {
  children?: ReactNode;
}

export const Form: FC<MyFormProps> = ({ children, ...restProps }) => {

  return (
    <form {...restProps}>
      {children}
    </form>
  )
}

Form.defaultProps = {
  style: { width: '60%' }
}