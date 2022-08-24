import React from 'react';
import { Steps } from './components'

function App() {

  return (
    <div>
      <Steps current={3}>
        <Steps.Step title='first step' description='139139003332200313900333223322'/>
        <Steps.Step title='second step' description='jfdsjfoidsjfiosdofh'/>
        <Steps.Step title='three step' description='哈哈哈' state='error'/>
        <Steps.Step title='four step' description='嘻嘻嘻'/>
      </Steps>
    </div>
  );
}

export default App;