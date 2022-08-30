import React from 'react';
import { Table, Pagination } from './components'

function App() {

  const tableColumns = [
    {
      dataIndex: 1,
      title: 'name'
    },
    {
      dataIndex: 2,
      title: 'age'
    },
    {
      dataIndex: 3,
      title: 'sex'
    },
    {
      dataIndex: 4,
      title: 'inter',
      // render: (_: any, d: any) => (
      //   <div>
      //     <p>{d.name}</p>
      //     <p>{d.age}</p>
      //   </div>
      // )
    },
  ];

  const source = [
    {
      key: '3',
      name: 'lucy',
      age: '11',
      sex: 'man',
      inter: 'basket'
    },
    {
      key: '30',
      name: 'candy',
      age: '131',
      sex: 'female',
      inter: 'footer'
    },
  ]

  return (
    <div>
      <div style={{ width: 600 }}>
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
      </div>

    </div>
  );
}

export default App;