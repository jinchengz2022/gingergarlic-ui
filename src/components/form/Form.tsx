import React, { ReactNode, FormHTMLAttributes, FC } from 'react';
import { useStore } from '../../utils'

export interface MyFormProps extends Omit<FormHTMLAttributes<HTMLElement>, 'children'> {
  children?: ReactNode;
}
type FormContextValue = ReturnType<typeof useStore>
export const FormContext = React.createContext<FormContextValue>({} as FormContextValue)

export const Form: FC<MyFormProps> = ({ children, ...restProps }) => {

  // 添加、更新、保存FormItem组件下的键值集合
  const { dispatch, formStore } = useStore();

  // 通过context传递
  const formValue: FormContextValue = { dispatch, formStore }

  return (
    <form {...restProps}>
      <FormContext.Provider value={formValue}>
        {children}
      </FormContext.Provider>
    </form>
  )
}

Form.defaultProps = {
  style: { width: '60%' }
}