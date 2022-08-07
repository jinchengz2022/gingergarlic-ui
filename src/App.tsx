import React from 'react';
import { Input, Select } from '../src/components'
import { jcRequest } from './service'

function App() {

  const options = [
    {value: 'id', label: '1'},
    {value: 'id1', label: '2'},
    {value: 'id2', label: '3', disabled: true}
  ]

  return (
    <div>
      <Input
        // prepand='https://'
        // append='.com'
        // style={{ width: 300 }}
        // appendIcon={<QuestionOutlined style={{ color: '#1890FF' }} />}
        // preIcon={<SmileFilled style={{ color: '#1890FF' }} />}
        searchCondition='auto'
        debounce={800}
        request={async () => {
          const res = await jcRequest('https://api.github.com/search/users?q=ab');
          return res.items.map((item: any) => item.login)
        }}
      />
      <br />
      <br />
      <br />
      <Select 
      placeholder='123'
      options={options} 
      style={{ width: 200 }}
      allowClear
      // request={async () => {
      //   const res = await jcRequest('https://api.github.com/search/users?q=ab');
      //   return res.items.map((item: any) => ({ value: item.login, label: item.login}))
      // }}
      />
    </div>
  );
}

export default App;
