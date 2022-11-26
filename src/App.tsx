import React from 'react';
import { Button, Modal, Tabs, TabsPane } from './components'

function App() {
  const [visible, updateVisible] = React.useState(false)

  return (
    <div>
      {/* <div style={{ width: 600 }}>
        <Table
          tableTitle='xxx'
          column={tableColumns}
          dataSource={source}
          rowSelection={{
            type: 'radio',
            onSelect: (_, row) => {console.log(row)}
          }}
        />
        <Pagination total={100}/>
      </div> */}
      {visible && (
        <Modal visible={visible} title='123' onClose={() => updateVisible(false)}>
        <h1>one</h1>
      </Modal>
      )}
      {/* <Button onClick={() => updateVisible(true)}>showModal</Button> */}
      <Tabs>
        <TabsPane tabKey='dasdas' title='test1'>
          <p>1111</p>
        </TabsPane>
        <TabsPane tabKey={2} title='test2'>
        <p>2222</p>
        </TabsPane>
      </Tabs>
    </div>
  );
}

export default App;