import React from 'react';
import { Menu, MenuItem } from './components/menu'

function App() {

  return (
    <div>
      <Menu
        defaultSelectKey={0} 
        onSelect={(index) => {
          console.log(index)
        }}
        mode='horizontal'
      >
        <MenuItem index={0} disabled>
          123
        </MenuItem>
        <MenuItem index={1}>
          3465
        </MenuItem>
        <MenuItem index={2}>
          567
        </MenuItem>
      </Menu>
    </div>
  );
}

export default App;
