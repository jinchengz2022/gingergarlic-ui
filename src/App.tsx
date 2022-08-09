import React, { useEffect, useState } from 'react';
import { Upload, Modal, Button } from '../src/components'

function App() {
  const[visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => {
        setVisible(true);
      }}>456456</Button>
      <Modal visible={visible}>
        <span>adfafa</span>
      </Modal>
    </div>
  );
}

export default App;
