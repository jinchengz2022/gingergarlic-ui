import React, { useState, useRef, ChangeEvent } from 'react'
import classNames from 'classnames'

import { useListennerEvent } from '../../utils'

type Options = {
  value: string | number;
  label: string | number;
  disabled?: boolean;
}[];

interface SelectProps {
  /** 下拉框选项*/
  options: Options;
  /** 是否禁用*/
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** 选中后是否过滤*/
  filterOptions?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  /** 清空按钮*/
  allowClear?: boolean;
  /** 是否进行搜索条件过滤*/
  showSearch?: boolean;
  /** 通过请求查询选项*/
  request?: () => Options | Promise<Options>;
}

export const Select: React.FC<SelectProps> = ({
  options,
  disabled,
  className,
  filterOptions,
  placeholder,
  style,
  defaultValue,
  allowClear,
  request
}) => {
  /**下拉框展示 */
  const [optionsVisiable, OptionsVisiable] = useState(false);
  /**清除按钮 */
  const [clear, Clear] = useState(false);
  /**输入值 */
  const [inputValue, setInputValue] = useState<string | number>(defaultValue ?? '');
  /**下拉框选项 */
  const [optionsData, setOptionsData] = useState<Options>(options);
  /**request存在时搜索状态 */
  const [loading, setLoading] = useState(false);
  const selectRef = useRef<any>();
  useListennerEvent(selectRef, 'click', () => OptionsVisiable(false));

  const classes = classNames('select', className, {
    [`select-disabled`]: disabled
  })

  const selectOptions = () => {
    const showOptions = filterOptions ? optionsData.filter((o) => o.label !== inputValue) : optionsData;
    return (
      <div className="options">
        {
          showOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                setInputValue(option.label)
                OptionsVisiable(false)
              }}
              style={{
                backgroundColor: option.label === inputValue ? '#e6f7ff' : option.disabled ? 'unset' : 'none',
                cursor: option.disabled ? 'not-allowed' : 'default',
                color: option.disabled ? '#00000040' : 'unset',
              }}
            >
              {option.label}
            </div>
          ))
        }
      </div>
    )
  }

  return (
    <div className={classes} style={style}>
      <div
        className="select-wrapper"
        ref={selectRef}
        onMouseMove={() => allowClear && Clear((inputValue !== '' && allowClear) ? true : false)}
        onMouseLeave={() => allowClear && Clear(false)}
      >
        <input
          type="text"
          disabled={disabled}
          onClick={async () => {
            if (request && !optionsVisiable) {
              setLoading(true);
              const res = await request();
              setLoading(false);
              setOptionsData(res);
            }
            OptionsVisiable(!optionsVisiable)
          }}
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          placeholder={placeholder}
        />
        {clear && !loading && <span
          className="gg-close-o"
          onClick={() => {
            setInputValue('');
            Clear(false)
          }} />}
        {loading && <span className="gg-spinner-alt" />}
        {!clear && !loading && <span className="gg-chevron-down" />}

        {optionsVisiable && selectOptions()}
      </div>
    </div>
  )
}

Select.defaultProps = { style: { width: 200 } };
