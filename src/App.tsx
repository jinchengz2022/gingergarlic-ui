import React, { useEffect, useState } from 'react';
import { Upload, Modal, Button } from '../src/components'

function App() {
  const[visible, setVisible] = useState(false);

  const cannel = () => {
    setVisible(false);
  }

  return (
    <div>
      <Button onClick={() => {
        setVisible(true);
      }}>456456</Button>
      <Modal visible={visible} title='对话框' onCannel={cannel} clickSpace={false}>
        <span>adfafa</span>
      </Modal>
    </div>
  );
}

export default App;
