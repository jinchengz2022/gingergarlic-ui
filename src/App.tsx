import React from 'react';
import { Form, Input, Select, FormItem } from '../src/components'

function App() {

  return (
    <div>
      <Form>
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
          {(values) => <Input />}
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