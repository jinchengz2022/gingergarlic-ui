import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { requestDebounce } from './requestDebounce'

interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: 'lg' | 'sm';
  /** input前置图标 */
  preIcon?: React.ReactNode;
  /** input后置图标 */
  appendIcon?: React.ReactNode;
  /** input前缀 */
  prepand?: string | React.ReactNode;
  /** input后缀 */
  append?: string | React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  /** input输入搜索触发条件 */
  searchCondition?: 'auto' | 'click';
  onChange?: (...args: any[]) => void;
  /** input请求必须配合searchCondition使用 */
  request?: () => Promise<any[]> | any[];
  /** 请求防抖 */
  debounce?: number;
}



export const Input: React.FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    preIcon,
    prepand,
    appendIcon,
    append,
    className,
    children,
    searchCondition,
    debounce,
    onChange,
    request,
    ...restProps
  } = props;

  // 搜索数据列表
  const [fetchData, setFetchData] = useState<string[]>([]);
  // input value
  const [selectValue, setValue] = useState<any>(restProps.value ?? '');
  // 搜索请求状态
  const [searchLoading, SearchLoading] = useState(false);

  /**
   * restProps.value ?? '' 写法说明 ----->>
   * 
   * react-dom.development.js:86 Warning: 
   * A component is changing an uncontrolled input to be controlled. 
   * This is likely caused by the value changing from undefined to a defined value, 
   * which should not happen. Decide between using a controlled or uncontrolled input
   *  element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components
   */

  const classes = classNames('input', className, {
    [`input-${size}`]: size,
    [`input-${disabled}`]: disabled,
  });



  const getOption = async (value: string | number) => {
    if (request && searchCondition === 'auto' && value !== '') {
      SearchLoading(true);
      try {
        const result = await request();
        const filterResult = result.filter((item) => item.includes(value));
        setFetchData(filterResult.length > 0 ? filterResult : ['暂无数据'])
        SearchLoading(false);
      } catch (error) {
        SearchLoading(false);
        setFetchData([]);
        console.error(error);
      }
    }
  }

  /**
   * 输入后查询的数据
   * @param e 输入事件
   */
  const autoCompleteChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (e.target.value) {
      if (debounce) {
        requestDebounce(() => getOption(e.target.value), debounce)
      } else {
        getOption(e.target.value)
      }
    } else {
      setValue('')
      setFetchData([]);
    }
  }

  /**
   * 下拉框选中后填充Input
   * @param selectedKey 选择值
   * @returns 
   */
  const onSelect = (selectedKey: string | number) => {
    if (selectedKey === '暂无数据') return;
    setValue(selectedKey);
    setFetchData([]);
  }

  /**
   * 搜索下拉列表组件
   * @returns 
   */
  const searchResultOption = () => (
    <ul>
      {
        fetchData.map((item) => (
          <li key={item} onClick={() => onSelect(item)}>{item}</li>
        ))
      }
    </ul>
  )

  const searchLoadingNode = () => (
    <ul>
      <li>Loading...</li>
    </ul>
  )

  return <div className={classes}>
    {prepand && <span className='prepand'>{prepand}</span>}
    <div className='input-wrapper' style={restProps.style}>
      {preIcon && <span className='preIcon'>{preIcon}</span>}
      <input
        disabled={disabled}
        {...restProps}
        onChange={searchCondition === 'auto' ? autoCompleteChange : onChange}
        value={selectValue}
      >
        {children}
      </input>
      {appendIcon && <span className='appendIcon'>{appendIcon}</span>}
      {fetchData.length > 0 && searchResultOption()}
      {searchLoading && searchLoadingNode()}
    </div>
    {append && <span className='append'>{append}</span>}

  </div>
}