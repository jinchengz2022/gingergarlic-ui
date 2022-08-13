import React from 'react';
import { Form, Input, Select, FormItem } from '../src/components'

function App() {

  return (
    <div>
      <Form>
        <FormItem label='name'>
          <Input/>
        </FormItem>
        <FormItem label='age'>
          <Select options={[{value: '10', label: '10'}]}/>
        </FormItem>
      </Form>
    </div>
  );
}

export default App;
