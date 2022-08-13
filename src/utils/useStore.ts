import * as React from 'react';

export interface FormState {
  name?: string | string[];
  rules: any[];
  isValidated: boolean;
}

interface FormAction {
  name: string;
  value: any;
  type: 'add' | 'update';
}

const formDispatch = (formState: Record<any, any>, action: FormAction) => {
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
  const [formStore, dispatch] = React.useReducer(formDispatch, {});
  return {
    formStore,
    dispatch
  }
}