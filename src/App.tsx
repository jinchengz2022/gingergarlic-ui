import React from 'react';
import { Table } from './components'

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
      render: (_: any, d: any) => (
        <div>
          <p>{d.name}</p>
          <p>{d.age}</p>
        </div>
      )
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
      <Table
        tableTitle='xxx'
        column={tableColumns}
        dataSource={source}
      />
    </div>
  );
}

export default App;