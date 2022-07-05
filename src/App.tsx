import React from 'react';
import { Button, ButtonSize, ButtonTypes } from './components/button'

function App() {

  return (
    <div>
      <Button size='sm' type='primary'>Primary button</Button>
      <Button type='danger' disable>Danger button</Button>
      <Button type='link' href='1'>Link button</Button>
    </div>
  );
}

export default App;
