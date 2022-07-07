import React from 'react';
import { Button } from './components/button'
import { Alert } from './components/alert'

function App() {

  return (
    <div>
      <Button size='sm' btnType='primary'>Primary button</Button>
      <Button btnType='danger' disable>Danger button</Button>
      <Button btnType='link' href='1'>Link button</Button>

      <Alert title='2323' content='123434' alertType='danger'/>
    </div>
  );
}

export default App;
