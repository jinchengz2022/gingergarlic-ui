import React from 'react'
import classNames from 'classnames';

import { Input } from '../input'
import { useListennerEvent, curMonthDayAry, uniqueKey } from '../../utils'

export const DatePicker: React.FC<any> = () => {
  const [datePickerVisibled, updateDatePickerVisibled] = React.useState(false);
  const [inputValue, updateInputValue] = React.useState('');
  const [yearAndMonth, updateDay] = React.useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  });
  const [curMonthDay, updateCurMonthDay] = React.useState(curMonthDayAry(
    yearAndMonth.year,
    yearAndMonth.month,
  ));
  const datePickerInputRef = React.useRef<any>();

  useListennerEvent(datePickerInputRef, 'click', () => {
    updateDatePickerVisibled(false);
    updateCurMonthDay(curMonthDayAry(new Date().getFullYear(), new Date().getMonth()));
    updateDay({
      year: new Date().getFullYear(),
      month: new Date().getMonth()
    })
  });

  React.useEffect(() => {
    updateCurMonthDay(curMonthDayAry(yearAndMonth.year, yearAndMonth.month))
  }, [yearAndMonth])

  return (
    <div className='date-picker-container' ref={datePickerInputRef}>
      <Input
        style={{ width: 200 }}
        onClick={() => updateDatePickerVisibled(!datePickerVisibled)}
        value={inputValue}
      />
      <div className={classNames('date-picker', {})} style={{ display: datePickerVisibled ? 'block' : 'none' }}>
        <div className="date-picker-header">
          <div>
            <span
              style={{ marginRight: 8 }}
              onClick={() => updateDay({ ...yearAndMonth, year: yearAndMonth.year - 1 })}
            >&lt;&lt;</span>
            <span
              onClick={() => {
                if (yearAndMonth.month > 0) {
                  updateDay({ ...yearAndMonth, month: yearAndMonth.month - 1 })
                } else {
                  updateDay({ year: yearAndMonth.year - 1, month: 11 })
                }
              }}
            >&lt;</span>
          </div>
          <div>
            <span style={{ marginRight: 8 }}>
              {yearAndMonth.year}年
            </span>
            <span>
              {yearAndMonth.month + 1}月
            </span>
          </div>
          <div>
            <span
              style={{ marginRight: 8 }}
              onClick={() => {
                if (yearAndMonth.month < 11) {
                  updateDay({ ...yearAndMonth, month: yearAndMonth.month + 1 })
                } else {
                  updateDay({ year: yearAndMonth.year + 1, month: 0 })
                }
              }}
            >&gt;</span>
            <span onClick={() => updateDay({ ...yearAndMonth, year: yearAndMonth.year + 1 })}>&gt;&gt;</span>
          </div>
        </div>
        <div className="date-picker-content">
          <table>
            <thead>
              <tr>
                {['一', '二', '三', '四', '五', '六', '日'].map((week) => <th key={week}>{week}</th>)}
              </tr>
            </thead>
            <tbody>
              {curMonthDay.map((_, index) => (index + 1) % 7 === 0 && (
                <tr key={uniqueKey()}>
                  {curMonthDay.slice((((index + 1) / 7 - 1) * 7), index + 1)
                    .map((day) => (
                      <td
                        key={uniqueKey()}
                        style={{ color: day.includes('_') ? 'rgb(221, 218, 218)' : '#000' }}
                        onClick={() => updateInputValue(`${yearAndMonth.year}/${yearAndMonth.month + 1}/${day}`)}
                      >
                        {day.includes('_') ? day.split('_')[1] : day}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="date-picker-footer">
          <span>今天</span>
        </div>
      </div>
    </div>

  )
}