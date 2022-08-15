import React from 'react';
import { Form, Input, Select } from '../src/components'

function App() {

  return (
    <div>
      <Form>
        <Form.Item
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
        </Form.Item>
        <Form.Item label='age'>
          <Select options={[{ value: '10', label: '10' }]} />
        </Form.Item>
        <Form.Item name='checked'>
          <button type='submit'>submit</button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;