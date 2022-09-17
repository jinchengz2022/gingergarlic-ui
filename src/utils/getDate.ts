
export const getCurrentDate = () => {
  return new Date();
}

/***
  * 获得本月的起止时间
  */
const getCurrentMonth = () => {
  //起止日期数组  
  const startStop = new Array();
  //获取当前时间  
  const currentDate = getCurrentDate();
  //获得当前月份0-11  
  let currentMonth = currentDate.getMonth();
  //获得当前年份4位年  
  let currentYear = currentDate.getFullYear();
  //求出本月第一天  
  const firstDay = new Date(currentYear, currentMonth, 1);


  //当为12月的时候年份需要加1  
  //月份需要更新为0 也就是下一年的第一个月  
  if (currentMonth == 11) {
    currentYear++;
    currentMonth = 0; //就为  
  } else {
    //否则只是月份增加,以便求的下一月的第一天  
    currentMonth++;
  }


  //一天的毫秒数  
  const millisecond = 1000 * 60 * 60 * 24;
  //下月的第一天  
  const nextMonthDayOne = new Date(currentYear, currentMonth, 1);
  //求出上月的最后一天  
  const lastDay = new Date(nextMonthDayOne.getTime() - millisecond);

  //添加至数组中返回  
  startStop.push(firstDay);
  startStop.push(lastDay);
  //返回  
  return startStop;
};

export const getPriorMonthFirstDay = (year: number, month: number) => {
  //年份为0代表,是本年的第一月,所以不能减  
  if (month == 0) {
    month = 11; //月份为上年的最后月份  
    year--; //年份减1  
    return new Date(year, month, 1);
  }
  //否则,只减去月份  
  month--;
  return new Date(year, month, 1);;
};

/**
  * 获得该月的天数
  * @param year年份
  * @param month月份
  * */
export const getMonthDays = (year: number, month: number) => {
  //本月第一天 1-31  
  const relativeDate = new Date(year, month, 1);
  //获得当前月份0-11  
  let relativeMonth = relativeDate.getMonth();
  //获得当前年份4位年  
  let relativeYear = relativeDate.getFullYear();

  //当为12月的时候年份需要加1  
  //月份需要更新为0 也就是下一年的第一个月  
  if (relativeMonth == 11) {
    relativeYear++;
    relativeMonth = 0;
  } else {
    //否则只是月份增加,以便求的下一月的第一天  
    relativeMonth++;
  }
  //一天的毫秒数  
  const millisecond = 1000 * 60 * 60 * 24;
  //下月的第一天  
  const nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
  //返回得到上月的最后一天,也就是本月总天数  
  return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
};

/**
  * 获得月份的起止日期
  * ***/
export const getMonthDay = (month: number = 0) => {
  //起止日期数组  
  const startStop = [];
  //获取当前时间  
  const currentDate = getCurrentDate();
  //获得当前月份(当月加一反之不加)  
  const currentMonth = currentDate.getMonth() + month;
  //获得当前年份4位年  
  const currentYear = currentDate.getFullYear();
  //获得上一个月的第一天  
  const priorMonthFirstDay = getPriorMonthFirstDay(currentYear, currentMonth);
  //获得上一月的最后一天  
  const priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth()));
  //添加至数组  
  startStop.push(priorMonthFirstDay);
  startStop.push(priorMonthLastDay);
  //返回  
  return startStop;
};

/**
    * 获得上一周的起止日期
    * **/
export const getPreviousWeek = () => {
  //起止日期数组  
  const startStop = new Array();
  //获取当前时间  
  const currentDate = getCurrentDate();
  //返回date是一周中的某一天  
  const week = currentDate.getDay();
  //返回date是一个月中的某一天  
  const month = currentDate.getDate();
  //一天的毫秒数  
  const millisecond = 1000 * 60 * 60 * 24;
  //减去的天数  
  const minusDay = week != 0 ? week - 1 : 6;
  //获得当前周的第一天  
  const currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay));
  //上周最后一天即本周开始的前一天  
  const priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond);
  //上周的第一天  
  const priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6));

  //添加至数组  
  startStop.push(priorWeekFirstDay);
  startStop.push(priorWeekLastDay);

  return startStop;
};

/**
* 得到上季度的起始日期
* year 这个年应该是运算后得到的当前本季度的年份
* month 这个应该是运算后得到的当前季度的开始月份
* */
export const getPriorSeasonFirstDay = (year: number, month: number) => {
  const quarterMonthStart = 0;
  const spring = 0; //春  
  const summer = 3; //夏  
  const fall = 6;   //秋  
  const winter = 9; //冬  
  //月份从0-11  
  switch (month) {//季度的其实月份  
    case spring:
      //如果是第一季度则应该到去年的冬季  
      year--;
      month = winter;
      break;
    case summer:
      month = spring;
      break;
    case fall:
      month = summer;
      break;
    case winter:
      month = fall;
      break;

  };

  return new Date(year, month, 1);
};

/**
* 得到上季度的起止日期
* **/
export const getPreviousSeason = () => {
  //起止日期数组  
  const startStop = [];
  //获取当前时间  
  const currentDate = getCurrentDate();
  //获得当前月份0-11  
  const currentMonth = currentDate.getMonth();
  //获得当前年份4位年  
  const currentYear = currentDate.getFullYear();
  //上季度的第一天  
  const priorSeasonFirstDay = getPriorSeasonFirstDay(currentYear, currentMonth);
  //上季度的最后一天  
  const priorSeasonLastDay = new Date(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2, getMonthDays(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2));
  //添加至数组  
  startStop.push(priorSeasonFirstDay);
  startStop.push(priorSeasonLastDay);
  return startStop;
};

/**
* 得到今年或去年的的起止日期
* **/
export const getPreviousYear = (year: number = 1) => {
  //起止日期数组  
  const startStop = [];
  //获取当前时间  
  const currentDate = getCurrentDate();
  //获得当前年份4位年  
  let currentYear = currentDate.getFullYear();
  currentYear--;
  const getYearFirstDay = new Date(currentYear, 0, 1);
  // 去年为1 今年为31
  const getYearLastDay = new Date(currentYear, 11, year);
  //添加至数组  
  startStop.push(getYearFirstDay);
  startStop.push(getYearLastDay);
  return startStop;
};

export // 本月+上月+下月的天数
const curMonthDayAry = (preMonthLastDay: number, curMonthLastDay: number, curMonthFirstWeek: number, curMonthLastWeek: number) => {
  return new Array(curMonthLastDay + curMonthFirstWeek - curMonthLastWeek + 6)
    .fill('')
    .map((_, index) => {
      // 本月之前的天数
      if ((index + 1) < curMonthFirstWeek) {
        return "_" + String(preMonthLastDay - curMonthFirstWeek + index + 2)
      }
      // 本月之后的天数
      if ((index + 1) > (curMonthLastDay + curMonthFirstWeek - 1)) {
        return "_" + String((index + 1) - (curMonthLastDay + curMonthFirstWeek - 1))
      }
      // 本月的天数
      return String(index - 2);
    })
}
