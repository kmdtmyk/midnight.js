import Midnight from './midnight'

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
  expect(Midnight.equals(Midnight.create(2017, 5, 20), '2017/05/20')).toBe(true)
  expect(Midnight.equals(Midnight.create(2017, 5, 0), '2017/04/30')).toBe(true)
  expect(Midnight.equals(Midnight.create(2017, 5, 32), '2017/06/01')).toBe(true)
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
  expect(Midnight.equals(new Midnight('2016/08/01').endOfMonth(), '2016/08/31')).toBe(true)
  expect(Midnight.equals(new Midnight('2016/08/15').endOfMonth(), '2016/08/31')).toBe(true)
  expect(Midnight.equals(new Midnight('2016/08/31').endOfMonth(), '2016/08/31')).toBe(true)

  expect(Midnight.equals(new Midnight('2016/02/25').endOfMonth(), '2016/02/29')).toBe(true)
  expect(Midnight.equals(new Midnight('2017/02/25').endOfMonth(), '2017/02/28')).toBe(true)
})

test('endOfYear', () => {
  expect(Midnight.equals(new Midnight('2017/01/01').endOfYear(), '2017/12/31')).toBe(true)
  expect(Midnight.equals(new Midnight('2017/05/15').endOfYear(), '2017/12/31')).toBe(true)
  expect(Midnight.equals(new Midnight('2017/12/31').endOfYear(), '2017/12/31')).toBe(true)
  expect(Midnight.equals(new Midnight('2018/01/01').endOfYear(), '2018/12/31')).toBe(true)
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
  expect(Midnight.equals(date.day(0), '2017/04/30')).toBe(true)
  expect(Midnight.equals(date.day(1), '2017/05/01')).toBe(true)
  expect(Midnight.equals(date.day(31), '2017/05/31')).toBe(true)
  expect(Midnight.equals(date.day(32), '2017/06/01')).toBe(true)
})

test('month', () => {
  let date = new Midnight('2017/05/15')
  expect(date.month()).toBe(5)
  expect(Midnight.equals(date.month(4), '2017/04/15')).toBe(true)
  expect(Midnight.equals(date.month(6), '2017/06/15')).toBe(true)

  date = new Midnight('2016/08/31')
  expect(Midnight.equals(date.month(9), '2016/09/30')).toBe(true)
  expect(Midnight.equals(date.month(2), '2016/02/29')).toBe(true)
  expect(Midnight.equals(date.month(6), '2016/06/30')).toBe(true)
})

test('nextDay', () => {
  const date = new Midnight('2017/05/15')
  expect(Midnight.equals(date.nextDay(), '2017/05/16')).toBe(true)
  expect(Midnight.equals(date.nextDay(-15), '2017/04/30')).toBe(true)
  expect(Midnight.equals(date.nextDay(-1), '2017/05/14')).toBe(true)
  expect(Midnight.equals(date.nextDay(0), '2017/05/15')).toBe(true)
  expect(Midnight.equals(date.nextDay(1), '2017/05/16')).toBe(true)
  expect(Midnight.equals(date.nextDay(17), '2017/06/01')).toBe(true)
})

test('nextMonth', () => {
  let date = new Midnight('2016/08/01')
  expect(Midnight.equals(date.nextMonth(), '2016/09/01')).toBe(true)
  expect(Midnight.equals(date.nextMonth(1), '2016/09/01')).toBe(true)
  expect(Midnight.equals(date.nextMonth(4), '2016/12/01')).toBe(true)
  expect(Midnight.equals(date.nextMonth(5), '2017/01/01')).toBe(true)

  date = new Midnight('2016/08/15')
  expect(Midnight.equals(date.nextMonth(-1), '2016/07/15')).toBe(true)
  expect(Midnight.equals(date.nextMonth(0), '2016/08/15')).toBe(true)
  expect(Midnight.equals(date.nextMonth(1), '2016/09/15')).toBe(true)

  date = new Midnight('2016/08/31')
  expect(Midnight.equals(date.nextMonth(1), '2016/09/30')).toBe(true)
  expect(Midnight.equals(date.nextMonth(6), '2017/02/28')).toBe(true)
  expect(Midnight.equals(date.nextMonth(-2), '2016/06/30')).toBe(true)
})

test('nextYear', () => {
  let date = new Midnight('2016/05/15')
  expect(Midnight.equals(date.nextYear(), '2017/05/15')).toBe(true)
  expect(Midnight.equals(date.nextYear(-1), '2015/05/15')).toBe(true)
  expect(Midnight.equals(date.nextYear(0), '2016/05/15')).toBe(true)
  expect(Midnight.equals(date.nextYear(1), '2017/05/15')).toBe(true)

  date = new Midnight('2016/02/29')
  expect(Midnight.equals(date.nextYear(-1), '2015/02/28')).toBe(true)
  expect(Midnight.equals(date.nextYear(1), '2017/02/28')).toBe(true)
  expect(Midnight.equals(date.nextYear(4), '2020/02/29')).toBe(true)
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
  expect(Midnight.equals(new Midnight('2017/05/01').startOfMonth(), '2017/05/01')).toBe(true)
  expect(Midnight.equals(new Midnight('2017/05/20').startOfMonth(), '2017/05/01')).toBe(true)
  expect(Midnight.equals(new Midnight('2017/05/31').startOfMonth(), '2017/05/01')).toBe(true)
})

test('startOfYear', () => {
  expect(Midnight.equals(new Midnight('2017/01/01').startOfYear(), '2017/01/01')).toBe(true)
  expect(Midnight.equals(new Midnight('2017/05/15').startOfYear(), '2017/01/01')).toBe(true)
  expect(Midnight.equals(new Midnight('2017/12/31').startOfYear(), '2017/01/01')).toBe(true)
  expect(Midnight.equals(new Midnight('2018/01/01').startOfYear(), '2018/01/01')).toBe(true)
})

test('toObject', () => {
  const date = new Midnight('2017/05/20')
  expect(date.toObject()).toEqual({year: 2017, month: 5, day: 20})
})

test('year', () => {
  let date = new Midnight('2017/05/20')
  expect(date.year()).toBe(2017)
  expect(Midnight.equals(date.year(2016), '2016/05/20')).toBe(true)
  expect(Midnight.equals(date.year(2018), '2018/05/20')).toBe(true)

  date = new Midnight('2016/02/29')
  expect(Midnight.equals(date.year(2017), '2017/02/28')).toBe(true)
})

test('immutable', () => {
  const value = '2017/05/20'
  const date = new Midnight(value)
  date.day(1)
  expect(Midnight.equals(date, value)).toBe(true)
  date.month(1)
  expect(Midnight.equals(date, value)).toBe(true)
  date.year(2000)
  expect(Midnight.equals(date, value)).toBe(true)
  date.nextDay(1)
  expect(Midnight.equals(date, value)).toBe(true)
  date.nextMonth(1)
  expect(Midnight.equals(date, value)).toBe(true)
  date.nextYear(1)
  expect(Midnight.equals(date, value)).toBe(true)
  date.startOfMonth()
  expect(Midnight.equals(date, value)).toBe(true)
  date.startOfYear()
  expect(Midnight.equals(date, value)).toBe(true)
  date.endOfMonth()
  expect(Midnight.equals(date, value)).toBe(true)
  date.endOfYear()
  expect(Midnight.equals(date, value)).toBe(true)
})
