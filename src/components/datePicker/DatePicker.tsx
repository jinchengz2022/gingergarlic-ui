import React from 'react'
import classNames from 'classnames';

import { Input } from '../input'
import { Button } from '../button'
import { useListennerEvent, curMonthDayAry, uniqueKey, getMonthDay } from '../../utils'
import moment from 'moment';

export const DatePicker: React.FC<any> = () => {
  const getPreMonthLastDay = Number(moment(getMonthDay()[1]).format('YYYY-MM-DD').split('-')[2]);
  const getCurMonthLastDay = Number(moment(getMonthDay(1)[1]).format('YYYY-MM-DD').split('-')[2]);
  const getCurMonthFirstWeek = Number(getMonthDay(1)[0].getDay());
  const getCurMonthLastWeek = Number(getMonthDay(1)[1].getDay());
  const [datePickerVisibled, updateDatePickerVisibled] = React.useState(false);
  const [day, updateDay] = React.useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  });
  const [curMonthDay, updateCurMonthDay] = React.useState(curMonthDayAry(
    getPreMonthLastDay,
    getCurMonthLastDay,
    getCurMonthFirstWeek,
    getCurMonthLastWeek,
  ));
  const datePickerInputRef = React.useRef<any>();

  useListennerEvent(datePickerInputRef, 'click', () => updateDatePickerVisibled(false));

  return (
    <div className='date-picker-container' ref={datePickerInputRef}>
      <Input
        style={{ width: 200 }}
        onClick={() => updateDatePickerVisibled(!datePickerVisibled)}

      />
      <div className={classNames('date-picker', {})} style={{ display: datePickerVisibled ? 'block' : 'none' }}>
        <div className="date-picker-header">
          <div>
            <span style={{ marginRight: 8 }}>&lt;</span>
            <span>&lt;&lt;</span>
          </div>
          <div>
            <span style={{ marginRight: 8 }}>
              {day.year}年
            </span>
            <span>
              {day.month}月
            </span>
          </div>
          <div>
            <span style={{ marginRight: 8 }}>&gt;</span>
            <span>&gt;&gt;</span>
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
              {curMonthDay.map((row, index) => {
                if ((index + 1) % 7 === 0) {
                  return (
                    <tr key={uniqueKey()}>
                      {curMonthDay.slice((((index + 1) / 7 - 1) * 7), index + 1)
                        .map((day) => (
                          <td
                            key={uniqueKey()}
                            style={{ color: day.includes('_') ? 'rgb(221, 218, 218)' : '#000' }}>
                            {day.includes('_') ? day.split('_')[1] : day}
                          </td>
                        ))}
                    </tr>
                  )
                }
              })}
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