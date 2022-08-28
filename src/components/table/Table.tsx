import React from 'react'
import classNames from 'classnames';

export interface TableProps {
  column?: {
    dataIndex: string | number;
    title: string;
  }[];
  dataSource?: {
    key: string;
    [key: string]: any;
  }[];
  tableTitle?: string | React.ReactNode;
  border?: boolean;
}

export const Table: React.FC<TableProps> = props => {
  const { column, dataSource, tableTitle, border } = props;

  const classes = classNames('table');

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
                    className={classNames({
                      'table-thead-title': column.length > index + 1
                    })}
                  >
                    {col.title}
                  </td>
                ))
              }
            </tr>
          </thead>
        )}
        <tbody>
          {dataSource?.map((data) => (
            <tr key={data.key}>
              {
                column?.map((col, index) => (
                  <td
                    key={col.dataIndex}
                    className={classNames({
                      'table-tbody-border': border && column.length > index + 1
                    })}
                  >
                    {
                      data?.[col.title] ? data?.[col.title] : console.error('no match datasource')
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