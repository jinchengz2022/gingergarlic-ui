import React, { ReactNode, FormHTMLAttributes, FC, FormEvent } from 'react';
import { useStore } from '../../utils'

export interface MyFormProps extends Omit<FormHTMLAttributes<HTMLElement>, 'children'> {
  children?: ReactNode;
  onFinished?: (values: any) => void;
  onFinishedField?: (values: any, errors: any) => void;
}
type FormContextValue = ReturnType<typeof useStore>
export const FormContext = React.createContext<FormContextValue>({} as FormContextValue)

export const Form: FC<MyFormProps> = ({ children, onFinished, onFinishedField, ...restProps }) => {

  // 添加、更新、保存FormItem组件下的键值集合
  const { dispatch, formStore } = useStore();

  // 通过context传递
  const formValue: FormContextValue = { dispatch, formStore }

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // TODO: 1.提交表单验证全部表单项
    // TODO: 2.若有一项表单不通过则走onFinishedField
    const formValues = Object.keys(formStore).map((f) => ({
      [f]: formStore[f].value
    }))
    const formErrorsValues = Object.keys(formStore).map((f) => ({
      [f]: formStore[f]?.rules?.[0]?.message || 'error'
    }))
    if (onFinished) {
      onFinished(formValues);
    }
    if (onFinishedField) {
      onFinishedField(formValues, formErrorsValues)
    }
  }

  return (
    <form {...restProps} onSubmit={formSubmit}>
      <FormContext.Provider value={formValue}>
        {children}
      </FormContext.Provider>
    </form>
  )
}

Form.defaultProps = {
  style: { width: '60%' }
}