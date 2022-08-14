import React, { FC } from 'react';
import classNames from 'classnames';

import { FormContext } from './Form'
import { FormValue } from '../../utils'

export interface FormItemProps extends Omit<FormValue, 'isValidated' | 'message'> {
  children?: (({ values }: { values: any }) => React.ReactElement) | React.ReactElement;
}

export const FormItem: FC<FormItemProps> = (props) => {
  const { children, label, colon, name, rules, initialValue } = props;
  const { dispatch, formStore } = React.useContext(FormContext);

  // 添加该Item下的属性值
  React.useEffect(() => {
    if (name) {
      const isRequired = rules?.some((r) => r.required);
      dispatch({
        type: 'add', name,
        value: {
          name, label, rules, value: initialValue, isRequired
        }
      })
    }
  }, [])

  const classes = classNames('form-item', {
    [`form-item-no-label`]: !label,
  })

  const labelClasses = classNames('form-item-label', {
    [`form-item-label-isValidated`]: name && formStore[name]?.isRequired,
  })

  const itemClasses = classNames('form-item-ele', {
    [`form-item-isValidated`]: name && formStore[name]?.isValidated,
  })

  // 对应组件触发change事件保存对应改变值
  const formValueChange = (e: any) => {
    const value = e.target.value;
    if (name) {
      // 需验证字段时为空自动飘红
      const isValidated = rules?.some((r) => r.required) && value === '';
      // 存在自定义校验传入规则&输入值
      if (rules?.[0]?.validator) {
        rules?.[0]?.validator(rules, value)
      }
      dispatch({
        type: 'update', name,
        value: {
          ...formStore[name], value, isValidated
        }
      })
    }
  }

  const child = typeof children === 'function' ? children({values: formStore}) : children as  React.ReactElement;

  // 将onchange 以及 value添加到该组件属性上
  const cloneChild = React.cloneElement(
    child,
    {
      ...child.props,
      onChange: formValueChange,
      value: name && formStore[name]?.value,
    }
  )

  return (
    <div className={classes}>
      {label && (
        <div className={labelClasses}>
          <label title={label}>
            {label}
            {colon && <span>&nbsp;:&nbsp;</span>}
          </label>
        </div>
      )}
      <div className={itemClasses}>
        {cloneChild}
        {name && formStore[name]?.isValidated && (
          <div className='form-item-isValid'>
            {formStore[name]?.rules?.[0].message ?? `请输入${name}`}
          </div>
        )}
      </div>
    </div>
  )
}