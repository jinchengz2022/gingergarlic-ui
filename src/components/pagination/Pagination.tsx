import React, { FC } from 'react'
import classNames from 'classnames';

import { Select, Options } from '../select'
import { Input } from '../input'

export interface PaginationProps {
  total: number;
  pageSize?: number;
  current?: number;
  defaultCurrent?: number;
  showJumper?: boolean;
  showSizeChange?: boolean;
  showTotal?: boolean;
  pageSizeOptions?: Options;
  onChange?: (current: number, pageSize: number) => void;
}

export const Pagination: FC<PaginationProps> = props => {
  const {
    total,
    pageSize = 10,
    current,
    defaultCurrent = 1,
    showJumper,
    showSizeChange,
    showTotal,
    pageSizeOptions,
    onChange
  } = props;
  const [size, updateSize] = React.useState(pageSize);
  const [pageCurrent, updatePageCurrent] = React.useState(defaultCurrent ?? current);
  const [jumperNum, setJumperNum] = React.useState<string>();
  /** 更新显示的分页条数 */
  const updatePageDate = React.useMemo(() => {
    /** 数组存储共有几页 */
    const pageTotalNum = Array(Math.ceil(total / size)).fill('').map((_, index) => index + 1);
    const isOverDefaultLength = pageTotalNum.length > 5;
    /** 默认展示5页，若超出则只展示5页 */
    let liItems = isOverDefaultLength ? pageTotalNum.slice(0, 5) : pageTotalNum;
    if (pageCurrent > 5) {
      liItems = pageTotalNum.slice(pageCurrent - 5, pageCurrent);
    }
    return { pageTotalNum, liItems }
  }, [size, pageCurrent, total])

  const { pageTotalNum, liItems } = updatePageDate;

  const classes = classNames('pagination');
  const paginationPreClasses = classNames('pagination-pre', {
    'disabled': pageCurrent === 1
  });
  const paginationNextClasses = classNames('pagination-next', {
    'disabled': pageCurrent === pageTotalNum.length
  });

  /** 每页条数选项 */
  const defaultPageSizeOptions = pageSizeOptions ?? [
    { value: '10', label: '10条/页' },
    { value: '20', label: '20条/页' },
    { value: '30', label: '30条/页' },
    { value: '50', label: '50条/页' },
  ]

  /** 点击页码改变 */
  const changePageNum = (currentIndex: number) => {
    updatePageCurrent(currentIndex);
    onChange?.(currentIndex, pageSize);
  }

  /** 点击上一页改变 */
  const prePageNum = () => {
    if (pageCurrent === 1) return;
    onChange?.(pageCurrent - 1, pageSize);
    updatePageCurrent(pageCurrent - 1);
  }

  /** 点击下一页改变 */
  const nextPageNum = () => {
    if (pageCurrent === pageTotalNum.length) return;
    onChange?.(pageCurrent + 1, pageSize);
    updatePageCurrent(pageCurrent + 1);
  }

  const jumper = (
    <li className='pagination-tool'>
      <span style={{ marginRight: 3 }}>跳转至</span>
      <Input
        style={{ width: 60 }}
        onKeyDown={(e) => {
          if (e.code === 'Enter' && jumperNum && (pageTotalNum.includes(+jumperNum))) {
            updatePageCurrent(+jumperNum);
          }
        }}
        onChange={(e) => setJumperNum(e.target.value)}
        value={jumperNum}
      />
      <span style={{ marginLeft: 30 }}>页</span>
    </li>
  )

  const pageSizeSelect = (
    <li className='pagination-tool'>
      <Select
        options={defaultPageSizeOptions}
        style={{ width: 120 }}
        onSelect={(value) => {
          updateSize(+value);
          setJumperNum('');
          updatePageCurrent(1);
        }}
      />
    </li>
  )

  return (
    <ul className={classes}>
      <li
        className={paginationPreClasses}
        onClick={prePageNum}
      >
        &lt;
      </li>
      {liItems.map((number) => (
        (
          <li
            key={number}
            className={classNames('pagination-item', {
              'pagination-item-current': number === pageCurrent
            })}
            onClick={() => changePageNum(number)}
          >
            {number}
          </li>
        )
      ))}
      <li
        className={paginationNextClasses}
        onClick={nextPageNum}
      >
        &gt;
      </li>
      {showTotal && (
        <li className='pagination-tool'>
          共&nbsp;{total}&nbsp;条
        </li>
      )}
      {showSizeChange && pageSizeSelect}
      {showJumper && jumper}
    </ul>
  )
}