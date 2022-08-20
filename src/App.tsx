import React from 'react';
import { Pagination } from './components'

function App() {

  return (
    <div>
      <Pagination 
      total={100} 
      onChange={() => {console.log('1111')}}
      defaultCurrent={3}
      pageSize={30}
      />
    </div>
  );
}

export default App;