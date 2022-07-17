import React from 'react';
import { Input } from '../src/components'
import { QuestionOutlined } from '@ant-design/icons'
import { jcRequest } from './service'

function App() {

  return (
    <div>
      <Input
        // prepand='https://'
        // append='.com'
        style={{ width: 300 }}
        // appendIcon={<QuestionOutlined style={{ color: '#1890FF' }} />}
        // preIcon={<SmileFilled style={{ color: '#1890FF' }} />}
        searchCondition='auto'
        debounce={800}
        request={async () => {
          const res = await jcRequest('https://api.github.com/search/users?q=ab');
          return res.items.map((item: any) => item.login)
        }}
      />
    </div>
  );
}

export default App;
