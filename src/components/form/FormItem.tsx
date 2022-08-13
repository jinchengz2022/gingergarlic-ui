import React, { FC } from 'react';
import classNames from 'classnames';

import { FormContext } from './Form'

export interface FormItemProps {
  children?: React.ReactElement;
  label?: string;
  name?: string;
  colon?: boolean;
  rules?: any[];
  initialValue?: any;
}

export const FormItem: FC<FormItemProps> = (props) => {
  const { children, label, colon, name, rules, initialValue } = props;
  const { dispatch, formStore } = React.useContext(FormContext);

  // 添加该Item下的属性值
  React.useEffect(() => {
    if (name) {
      dispatch({
        type: 'add',
        name,
        value: {
          name, label, rules, value: initialValue
        }
      })
    }
  }, [])

  const classes = classNames('form-item', {
    [`form-item-no-label`]: !label,
  })

  // 对应组件触发change事件保存对应改变值
  const formValueChange = (e: any) => {
    const value = e.target.value;
    if (name) {
      const isValidated = rules ? value === '' : false;
      dispatch({
        type: 'update', name,
        value: {
          ...formStore[name], value, isValidated
        }
      })
    }
  }

  const child = children as React.ReactElement;

  // 将onchange 以及 value添加到该组件属性上
  const cloneChild = React.cloneElement(
    child,
    {
      ...child.props,
      onChange: formValueChange,
      value: name && formStore[name]?.value
    }
  )

  return (
    <div className={classes}>
      {label && (
        <div className='form-item-label'>
          <label title={label}>
            {label}
            {colon && <span>&nbsp;:&nbsp;</span>}
          </label>
        </div>
      )}
      <div className='form-item-ele'>
        {cloneChild}
        {name && formStore[name]?.isValidated && (
          <div className='form-item-isValid'>请输入{name}</div>
        )}
      </div>
    </div>
  )
}