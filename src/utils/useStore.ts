import * as React from 'react';

export type Rule = {
  required: boolean;
  message?: React.ReactNode;
  type?: 'email' | 'string' | 'number' | 'url' | 'boolean';
  length?: number;
  min?: number;
  max?: number;
  validator?: (rule?: any, value?: any) => Promise<string>;
}[];

export type FormValue = {
  name?: string;
  rules?: Rule;
  isValidated?: boolean;
  isRequired?: boolean;
  value?: any;
  label?: string;
  colon?: boolean;
  initialValue?: any;
};

export type FormState = Record<string, FormValue>;
export interface FormInstance {
  getFieldsValue: () => any;
  reSetFieldsValue: () => any;
  setFieldsValue: () => any;
}

export interface FormAction {
  name: string;
  value: FormValue;
  type: 'add' | 'update' | 'validate';
}

const formDispatch = (formState: FormState, action: FormAction) => {
  switch (action.type) {
    case 'add':
      return {
        ...formState,
        [action.name]: action.value
      };
    case 'update':
      return {
        ...formState,
        [action.name]: {
          ...action.value,
          value: action.value.value
        }
      };
    default:
      return formState;
  }
}

export const useStore = () => {
  const [formStore, dispatch] = React.useReducer(formDispatch, {} as FormState);
  return {
    formStore,
    dispatch
  }
}