import React from 'react';
import { Tabs, TabsPane, Button } from '../src/components'

function App() {

  return (
    <div>
      <Tabs type='edit'>
        <TabsPane index="tab1" title='tab1'>
          <Button>123</Button>
      </TabsPane>
      <TabsPane index="tab2" title='tab2'>
          <div style={{ color: 'palegoldenrod'}}>
            this is tabsPane test!!!
          </div>
      </TabsPane>
      <TabsPane index="tab3" title='tab3'>
          tab3
      </TabsPane>
      </Tabs>
    </div>
  );
}

export default App;
