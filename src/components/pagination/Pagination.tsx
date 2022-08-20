import React, { FC } from 'react'
import classNames from 'classnames';

export interface PaginationProps {
  total: number;
  pageSize?: number;
  current?: number;
  defaultCurrent?: number;
  showJumper?: boolean;
  showSizeChange?: boolean;
  showTotal?: boolean;
  onChange?: () => void;
}

export const Pagination: FC<PaginationProps> = props => {
  const { total, pageSize = 10, current, defaultCurrent = 1, onChange } = props;
  const liItemsLength = Array(Math.ceil(total / pageSize)).fill('').map((_, index) => index + 1);
  const overDefaultLength = liItemsLength.length > 5;
  const liItems = overDefaultLength ? liItemsLength.slice(0, 5) : liItemsLength;
  const [pageCurrent, updatePageCurrent] = React.useState(current ?? defaultCurrent);
  const [items, updateItems] = React.useState(liItems);

  const classes = classNames('pagination');
  const paginationPreClasses = classNames('pagination-pre', {
    'disabled': pageCurrent === 1
  });
  const paginationNextClasses = classNames('pagination-next', {
    'disabled': pageCurrent === liItemsLength.length
  });

  const changeCurrent = (currentIndex: number) => {
    updatePageCurrent(currentIndex);
    onChange?.();
  }

  const decreaseCurrent = () => {
    if (pageCurrent === 1) return;
    onChange?.();
    updatePageCurrent((pre) => {
      if (pre === 6) {
        updateItems(liItemsLength.slice(0, 5));
      }
      return pre - 1;
    });
  }

  const increaseCurrent = () => {
    if (pageCurrent === liItemsLength.length) return;
    onChange?.();
    updatePageCurrent((pre) => {
      if (pre === 5 || pre > 5) {
        updateItems(liItemsLength.slice(pre - 4, pre + 1));
      }
      return pre + 1
    });
  }

  return (
    <ul className={classes}>
      <li
        className={paginationPreClasses}
        onClick={decreaseCurrent}
      >
        &lt;
      </li>
      {items.map((number) => (
        (
          <li
            key={number}
            className={classNames('pagination-item', {
              'pagination-item-current': number === pageCurrent
            })}
            onClick={() => changeCurrent(number)}
          >
            {number}
          </li>
        )
      ))}
      <li
        className={paginationNextClasses}
        onClick={increaseCurrent}
      >
        &gt;
      </li>
    </ul>
  )
}