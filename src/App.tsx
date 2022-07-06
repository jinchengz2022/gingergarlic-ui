import React from 'react';
import { Button } from './components/button'

function App() {

  return (
    <div>
      <Button size='sm' btnType='primary'>Primary button</Button>
      <Button btnType='danger' disable>Danger button</Button>
      <Button btnType='link' href='1'>Link button</Button>
    </div>
  );
}

export default App;
