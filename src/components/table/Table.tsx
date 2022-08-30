import React, { ChangeEvent } from 'react'
import classNames from 'classnames';

export interface TableColumn {
  dataIndex: string | number;
  title: string;
  render?: (tdData: any, trData: any) => React.ReactNode;
}

type DataSource = {
  key: string;
} & Record<string, any>

export interface TableProps {
  column?: TableColumn[];
  dataSource?: DataSource[];
  tableTitle?: string | React.ReactNode;
  border?: boolean;
  rowSelection?: {
    type?: 'checkbox' | 'radio';
    onChange?: (selectKeys: any, selectRows: any) => void;
    onSelect?: (selectKeys: any, selectRows: any) => void;
  }
}

export const Table: React.FC<TableProps> = props => {
  const { column, dataSource, tableTitle, border, rowSelection } = props;

  const [rowsLog, updateRowsLog] = React.useState<string[]>([]);

  if (rowSelection && rowSelection.type !== 'radio') {
    rowSelection.type = 'checkbox';
  }

  const onRowSelected = (e: ChangeEvent<HTMLInputElement>, row?: DataSource) => {
    if (e.target.checked && rowSelection?.onSelect && row && rowSelection.type === 'radio') {
      updateRowsLog([row.key]);
    } else if (e.target.checked && rowSelection?.onSelect && row) {
      updateRowsLog([...rowsLog, row.key]);
      rowSelection.onSelect(row.key, row);
    } else if (!e.target.checked && rowSelection?.onSelect && row) {
      updateRowsLog((pre) => pre.filter(r => r !== row.key));
    }
  }

  const onRowsAllSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && dataSource) {
      updateRowsLog(dataSource?.map(d => d.key))
    } else {
      updateRowsLog([])
    }
  }

  return (
    <div>
      {tableTitle && <div className='table-title'>{tableTitle}</div>}
      <table className='table'>
        {column?.length !== 0 && (
          <thead>
            <tr>
              {
                column?.map((col, index) => (
                  <td
                    key={col.dataIndex}
                    className={classNames('table-thead-title', {
                      'table-thead-border': column.length > index + 1
                    })}
                  >
                    {
                      rowSelection &&
                      rowSelection.type === 'checkbox' &&
                      index === 0 && (
                        <input type='checkbox' onChange={onRowsAllSelected} />
                      )
                    }
                    <span style={{
                      marginLeft: rowSelection ?
                        ((index === 0 && rowSelection.type === 'checkbox') ?
                          12 : 25
                        ) : 0
                    }}>
                      {col.title}
                    </span>
                  </td>
                ))
              }
            </tr>
          </thead>
        )}
        <tbody>
          {dataSource?.map((row) => (
            <tr key={row.key} className={classNames('table-data-rows', {
              'table-rows-selectd': rowsLog.includes(row.key)
            })}>
              {
                column?.map((col, index) => (
                  <td
                    key={col.dataIndex}
                    className={classNames({
                      'table-tbody-border': border && column.length > index + 1,
                      'table-tbody-radio': rowSelection && index === 0
                    })}
                  >
                    {
                      rowSelection &&
                      index === 0 && (
                        <input
                          checked={rowsLog.includes(row.key)}
                          type={rowSelection.type}
                          style={{ marginRight: 12 }}
                          onChange={e => onRowSelected(e, row)}
                        />
                      )
                    }
                    {
                      col.render?.(row?.[col.title], row) ?? (
                        row?.[col.title] ? row?.[col.title] :
                          console.error('no match datasource')
                      )
                    }
                  </td>
                ))
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}