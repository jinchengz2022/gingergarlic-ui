import React, { ChangeEvent, InputHTMLAttributes, useState, useRef } from 'react'
import classNames from 'classnames'
import { requestDebounce, useClickOutSide } from '../../utils'

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
  /** 请求防抖事时间 */
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
  const [inputValue, setValue] = useState<any>(restProps.value ?? '');
  // 搜索请求状态
  const [searchLoading, SearchLoading] = useState(false);
  // 选项框键盘操作值
  const [keyboardIndex, setKeyboardIndex] = useState(-1);
  // 鼠标点击input外取消聚焦并关闭选项框
  const inputRef = useRef<any>()

  useClickOutSide(inputRef, () => setFetchData([]));

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

  /**
   * 键盘操作改变对应key
   * @param index 操作key值
   */
  const changeKeyboardIndex = (index: number) => {
    if (index < 0) index = 0;
    if (index >= fetchData.length) index = fetchData.length - 1;
    setKeyboardIndex(index);
  }

  /**
   * 键盘对应操作事件
   * @param e keyboard事件
   */
  const keyboardDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.code) {
      case 'Enter':
        if (fetchData[keyboardIndex]) {
          setValue(fetchData[keyboardIndex]);
          setFetchData([]);
          setKeyboardIndex(-1);
        }
        break;
      case 'Escape':
        setFetchData([]);
        setKeyboardIndex(-1);
        break;
      case 'ArrowDown':
        changeKeyboardIndex(keyboardIndex + 1)
        break;
      case 'ArrowUp':
        changeKeyboardIndex(keyboardIndex - 1)
        break;
      default:
        break;
    }
  }

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
  const autoCompleteChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setFetchData([]);
    if (e.target.value) {
      requestDebounce(() => getOption(e.target.value), debounce)
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
        fetchData.map((item, index) => {
          const keyboardOperateClassname = classNames('keyboard-operate', {
            'operateKey': index === keyboardIndex
          })
          return (
            <li key={index} onClick={() => onSelect(item)} className={keyboardOperateClassname}>{item}</li>
          )
        })
      }
    </ul>
  )

  const searchLoadingNode = () => (
    <ul>
      <li>Loading...</li>
    </ul>
  )

  return <div className={classes} ref={inputRef}>
    {prepand && <span className='prepand'>{prepand}</span>}
    <div className='input-wrapper' style={restProps.style}>
      {preIcon && <span className='preIcon'>{preIcon}</span>}
      <input
        disabled={disabled}
        {...restProps}
        onChange={searchCondition === 'auto' ? autoCompleteChange : onChange}
        value={inputValue}
        onKeyDown={keyboardDown}
        // onFocus={inputRef ? (e: any) => getOption(e.target.value) : undefined}
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