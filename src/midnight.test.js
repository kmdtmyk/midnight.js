import Midnight from './midnight'

expect.extend({
  toSameDate(received, argument){
    const date1 = new Date(received)
    const date2 = new Date(argument)
    const pass = date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
    return {
      pass,
      message(){
        if(pass){
          return `${received} and ${argument} are same date`
        }else{
          return `${received} and ${argument} are not same date`
        }
      }
    }
  }
})

test('time is fixed on 00:00:00.000', () => {
  const date = new Midnight()
  expect(date.getHours()).toBe(0)
  expect(date.getMinutes()).toBe(0)
  expect(date.getSeconds()).toBe(0)
  expect(date.getMilliseconds()).toBe(0)
})

test('instanceof Date', () => {
  const date = new Midnight()
  expect(date).toBeInstanceOf(Date)
})

test('create', () => {
  expect(Midnight.create(2017, 5, 20)).toSameDate('2017/05/20')
  expect(Midnight.create(2017, 5, 0)).toSameDate('2017/04/30')
  expect(Midnight.create(2017, 5, 32)).toSameDate('2017/06/01')
})

test('differenceInDays', () => {
  const date = new Midnight('2017/05/22')
  expect(date.differenceInDays(new Date('2017/05/27'))).toBe(5)
  expect(date.differenceInDays(new Midnight('2017/05/27'))).toBe(5)
  expect(date.differenceInDays('2017/05/27')).toBe(5)
  expect(date.differenceInDays(new Date('2017/04/10'))).toBe(-42)
  expect(date.differenceInDays(new Date('2017/05/22'))).toBe(0)
  expect(date.differenceInDays(new Date('2017/06/10'))).toBe(19)
  expect(date.differenceInDays(null)).toBe(NaN)
  expect(date.differenceInDays(undefined)).toBe(NaN)
  expect(date.differenceInDays('invalid date')).toBe(NaN)
})

test('endOfMonth', () => {
  expect(new Midnight('2016/08/01').endOfMonth()).toSameDate('2016/08/31')
  expect(new Midnight('2016/08/15').endOfMonth()).toSameDate('2016/08/31')
  expect(new Midnight('2016/08/31').endOfMonth()).toSameDate('2016/08/31')

  expect(new Midnight('2016/02/25').endOfMonth()).toSameDate('2016/02/29')
  expect(new Midnight('2017/02/25').endOfMonth()).toSameDate('2017/02/28')
})

test('endOfYear', () => {
  expect(new Midnight('2017/01/01').endOfYear()).toSameDate('2017/12/31')
  expect(new Midnight('2017/05/15').endOfYear()).toSameDate('2017/12/31')
  expect(new Midnight('2017/12/01').endOfYear()).toSameDate('2017/12/31')
  expect(new Midnight('2018/01/31').endOfYear()).toSameDate('2018/12/31')
})

test('equals', () => {
  const date = new Midnight('2017/05/20')
  expect(date.equals(new Date('2017/05/20'))).toBe(true)
  expect(date.equals(new Date('2017-05-20'))).toBe(true)
  expect(date.equals('2017/05/20')).toBe(true)

  expect(date.equals('2017/05/21')).toBe(false)
  expect(date.equals(null)).toBe(false)
  expect(date.equals(undefined)).toBe(false)
  expect(date.equals('invalid date')).toBe(false)
})

test('static equals', () => {
  expect(Midnight.equals(new Date('2017/05/20'), new Date('2017/05/20'))).toBe(true)
  expect(Midnight.equals(new Date('2017/05/20 01:23:45'), new Date('2017/05/20 12:34:56'))).toBe(true)
  expect(Midnight.equals(new Date('2017/05/20'), new Date('2017/05/21'))).toBe(false)
  expect(Midnight.equals('2017/05/20', '2017/05/20')).toBe(true)
  expect(Midnight.equals('2017/05/20', '2017/05/21')).toBe(false)
  expect(Midnight.equals('2017/05/20 01:23:45', '2017/05/20 12:34:56')).toBe(true)
})

test('day', () => {
  const date = new Midnight('2017/05/15')
  expect(date.day()).toBe(15)
  expect(date.day(0)).toSameDate('2017/04/30')
  expect(date.day(1)).toSameDate('2017/05/01')
  expect(date.day(31)).toSameDate('2017/05/31')
  expect(date.day(32)).toSameDate('2017/06/01')
})

test('month', () => {
  let date = new Midnight('2017/05/15')
  expect(date.month()).toBe(5)
  expect(date.month(-1)).toSameDate('2016/11/15')
  expect(date.month(0)).toSameDate('2016/12/15')
  expect(date.month(4)).toSameDate('2017/04/15')
  expect(date.month(6)).toSameDate('2017/06/15')
  expect(date.month(12)).toSameDate('2017/12/15')
  expect(date.month(13)).toSameDate('2018/01/15')

  date = new Midnight('2016/08/31')
  expect(date.month(9)).toSameDate('2016/09/30')
  expect(date.month(2)).toSameDate('2016/02/29')
  expect(date.month(6)).toSameDate('2016/06/30')
})

test('nextDay', () => {
  const date = new Midnight('2017/05/15')
  expect(date.nextDay()).toSameDate('2017/05/16')
  expect(date.nextDay(-15)).toSameDate('2017/04/30')
  expect(date.nextDay(-1)).toSameDate('2017/05/14')
  expect(date.nextDay(0)).toSameDate('2017/05/15')
  expect(date.nextDay(1)).toSameDate('2017/05/16')
  expect(date.nextDay(17)).toSameDate('2017/06/01')
})

test('nextMonth', () => {
  let date = new Midnight('2016/08/01')
  expect(date.nextMonth()).toSameDate('2016/09/01')
  expect(date.nextMonth(1)).toSameDate('2016/09/01')
  expect(date.nextMonth(4)).toSameDate('2016/12/01')
  expect(date.nextMonth(5)).toSameDate('2017/01/01')

  date = new Midnight('2016/08/15')
  expect(date.nextMonth(-1)).toSameDate('2016/07/15')
  expect(date.nextMonth(0)).toSameDate('2016/08/15')
  expect(date.nextMonth(1)).toSameDate('2016/09/15')

  date = new Midnight('2016/08/31')
  expect(date.nextMonth(1)).toSameDate('2016/09/30')
  expect(date.nextMonth(6)).toSameDate('2017/02/28')
  expect(date.nextMonth(-2)).toSameDate('2016/06/30')
})

test('nextYear', () => {
  let date = new Midnight('2016/05/15')
  expect(date.nextYear()).toSameDate('2017/05/15')
  expect(date.nextYear(-1)).toSameDate('2015/05/15')
  expect(date.nextYear(0)).toSameDate('2016/05/15')
  expect(date.nextYear(1)).toSameDate('2017/05/15')

  date = new Midnight('2016/02/29')
  expect(date.nextYear(-1)).toSameDate('2015/02/28')
  expect(date.nextYear(1)).toSameDate('2017/02/28')
  expect(date.nextYear(4)).toSameDate('2020/02/29')
})

test('setHours', () => {
  const date = new Midnight('2016/05/20')
  const value = date.valueOf()
  expect(date.setHours(1)).toBe(value)
  expect(date.getHours(1)).toBe(0)
  date.setHours(-1)
  expect(date.getHours()).toBe(0)
  expect(date.getDate()).toBe(19)
})

test('setMinutes', () => {
  const date = new Midnight('2016/05/20')
  const value = date.valueOf()
  expect(date.setMinutes(1)).toBe(value)
  expect(date.getMinutes()).toBe(0)
})

test('setSeconds', () => {
  const date = new Midnight('2016/05/20')
  const value = date.valueOf()
  expect(date.setSeconds(1)).toBe(value)
  expect(date.getSeconds()).toBe(0)
})

test('setMilliseconds', () => {
  const date = new Midnight('2016/05/20')
  const value = date.valueOf()
  expect(date.setMilliseconds(1)).toBe(value)
  expect(date.getMilliseconds()).toBe(0)
})

test('setTime', () => {
  const d = new Date()
  const date = new Midnight(d)
  const time = date.getTime()
  date.setTime(d.getTime())
  expect(date.getTime()).toBe(time)
})

test('startOfMonth', () => {
  expect(new Midnight('2017/05/01').startOfMonth()).toSameDate('2017/05/01')
  expect(new Midnight('2017/05/15').startOfMonth()).toSameDate('2017/05/01')
  expect(new Midnight('2017/05/31').startOfMonth()).toSameDate('2017/05/01')
})

test('startOfYear', () => {
  expect(new Midnight('2017/01/01').startOfYear()).toSameDate('2017/01/01')
  expect(new Midnight('2017/05/15').startOfYear()).toSameDate('2017/01/01')
  expect(new Midnight('2017/12/31').startOfYear()).toSameDate('2017/01/01')
})

test('toObject', () => {
  const date = new Midnight('2017/05/20')
  expect(date.toObject()).toEqual({year: 2017, month: 5, day: 20})
})

test('year', () => {
  let date = new Midnight('2017/05/20')
  expect(date.year()).toBe(2017)
  expect(date.year(2016)).toSameDate('2016/05/20')
  expect(date.year(2018)).toSameDate('2018/05/20')

  date = new Midnight('2016/02/29')
  expect(date.year(2017)).toSameDate('2017/02/28')
})

test('immutable', () => {
  const value = '2017/05/20'
  const date = new Midnight(value)
  date.day(1)
  expect(date).toSameDate(value)
  date.month(1)
  expect(date).toSameDate(value)
  date.year(2000)
  expect(date).toSameDate(value)
  date.nextDay(1)
  expect(date).toSameDate(value)
  date.nextMonth(1)
  expect(date).toSameDate(value)
  date.nextYear(1)
  expect(date).toSameDate(value)
  date.startOfMonth()
  expect(date).toSameDate(value)
  date.startOfYear()
  expect(date).toSameDate(value)
  date.endOfMonth()
  expect(date).toSameDate(value)
  date.endOfYear()
  expect(date).toSameDate(value)
})
