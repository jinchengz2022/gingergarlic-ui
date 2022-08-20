import { FC } from 'react';
import { Form as OriginForm } from './Form'
import type { MyFormProps } from './Form'
import type { FormItemProps } from './FormItem'
import { FormItem } from './FormItem'

type FormType = FC<MyFormProps> & { 
  Item: FC<FormItemProps>;
  // useForm: () => 
 };

const Form = OriginForm as FormType;
Form.Item = FormItem;

export default Form;