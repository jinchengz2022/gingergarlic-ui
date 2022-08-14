import React from 'react';
import { Form, Input, Select, FormItem } from '../src/components'

function App() {

  const sub = (values: any) => {
    console.log(values, 'sssss');
  }

  const subErr = (values: any, error: any) => {
    console.log(values, 'err', error);
  }

  return (
    <div>
      <Form onFinished={sub} onFinishedField={subErr}>
        <FormItem
          label='name'
          name='name'
          rules={[
            {
              required: true,
              message: 'hhh',
              validator: (rules, value) => new Promise((res, rej) => {
                res(value);
              })
            }
          ]}
        >
          <Input />
        </FormItem>
        <FormItem label='age'>
          <Select options={[{ value: '10', label: '10' }]} />
        </FormItem>
        <FormItem name='checked'>
          <button type='submit'>submit</button>
        </FormItem>
      </Form>
    </div>
  );
}

export default App;
