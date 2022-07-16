import React from 'react';
import { Input } from '../src/components'
import { QuestionOutlined } from '@ant-design/icons'

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
        request={() => new Promise((resolve, reject) => setTimeout(() => {
          resolve(['lucy', 'james', 'cady', 'zhan', 'chou', 'jordan', 'ti', 'oop'])
        }, 1500))}
      />
    </div>
  );
}

export default App;
