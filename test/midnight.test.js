import test from 'ava'
import Midnight from '../dist/midnight'

test('time is fixed on 00:00:00.000', t => {
  const date = new Midnight()
  t.is(date.getHours(), 0)
  t.is(date.getMinutes(), 0)
  t.is(date.getSeconds(), 0)
  t.is(date.getMilliseconds(), 0)
})

test('instanceof Date', t => {
  const date = new Midnight()
  t.true(date instanceof Date)
})

test('create', t => {
  t.true(Midnight.equals(Midnight.create(2017, 5, 20), '2017/05/20'))
  t.true(Midnight.equals(Midnight.create(2017, 5, 0), '2017/04/30'))
  t.true(Midnight.equals(Midnight.create(2017, 5, 32), '2017/06/01'))
})

test('differenceInDays', t => {
  const date = new Midnight('2017/05/22')
  t.is(date.differenceInDays(new Date('2017/05/27')), 5)
  t.is(date.differenceInDays(new Midnight('2017/05/27')), 5)
  t.is(date.differenceInDays('2017/05/27'), 5)
  t.is(date.differenceInDays(new Date('2017/04/10')), -42)
  t.is(date.differenceInDays(new Date('2017/05/22')), 0)
  t.is(date.differenceInDays(new Date('2017/06/10')), 19)
  t.true(Number.isNaN(date.differenceInDays(null)))
  t.true(Number.isNaN(date.differenceInDays(undefined)))
  t.true(Number.isNaN(date.differenceInDays('invalid date')))
})

test('endOfMonth', t => {
  t.true(Midnight.equals(new Midnight('2016/08/01').endOfMonth(), '2016/08/31'))
  t.true(Midnight.equals(new Midnight('2016/08/15').endOfMonth(), '2016/08/31'))
  t.true(Midnight.equals(new Midnight('2016/08/31').endOfMonth(), '2016/08/31'))

  t.true(Midnight.equals(new Midnight('2016/02/25').endOfMonth(), '2016/02/29'))
  t.true(Midnight.equals(new Midnight('2017/02/25').endOfMonth(), '2017/02/28'))
})

test('endOfYear', t => {
  t.true(Midnight.equals(new Midnight('2017/01/01').endOfYear(), '2017/12/31'))
  t.true(Midnight.equals(new Midnight('2017/05/15').endOfYear(), '2017/12/31'))
  t.true(Midnight.equals(new Midnight('2017/12/31').endOfYear(), '2017/12/31'))
  t.true(Midnight.equals(new Midnight('2018/01/01').endOfYear(), '2018/12/31'))
})

test('equals', t => {
  const date = new Midnight('2017/05/20')
  t.true(date.equals(new Date('2017/05/20')))
  t.true(date.equals(new Date('2017-05-20')))
  t.true(date.equals('2017/05/20'))

  t.false(date.equals(new Date('2017/05/21')))
  t.false(date.equals(null))
  t.false(date.equals(undefined))
})

test('static equals', t => {
  t.true(Midnight.equals(new Date('2017/05/20'), new Date('2017/05/20')))
  t.true(Midnight.equals(new Date('2017/05/20 01:23:45'), new Date('2017/05/20 12:34:56')))
  t.false(Midnight.equals(new Date('2017/05/20'), new Date('2017/05/21')))
  t.true(Midnight.equals('2017/05/20', '2017/05/20'))
  t.false(Midnight.equals('2017/05/20', '2017/05/21'))
})

test('day', t => {
  const date = new Midnight('2017/05/15')
  t.is(date.day(), 15)
  t.true(Midnight.equals(date.day(0), '2017/04/30'))
  t.true(Midnight.equals(date.day(1), '2017/05/01'))
  t.true(Midnight.equals(date.day(31), '2017/05/31'))
  t.true(Midnight.equals(date.day(32), '2017/06/01'))
})

test('month', t => {
  let date = new Midnight('2017/05/15')
  t.is(date.month(), 5)
  t.true(Midnight.equals(date.month(4), '2017/04/15'))
  t.true(Midnight.equals(date.month(6), '2017/06/15'))

  date = new Midnight('2016/08/31')
  t.true(Midnight.equals(date.month(9), '2016/09/30'))
  t.true(Midnight.equals(date.month(2), '2016/02/29'))
  t.true(Midnight.equals(date.month(6), '2016/06/30'))
})

test('nextDay', t => {
  const date = new Midnight('2017/05/15')
  t.true(Midnight.equals(date.nextDay(), '2017/05/16'))

  t.true(Midnight.equals(date.nextDay(-15), '2017/04/30'))
  t.true(Midnight.equals(date.nextDay(-1), '2017/05/14'))
  t.true(Midnight.equals(date.nextDay(0), '2017/05/15'))
  t.true(Midnight.equals(date.nextDay(1), '2017/05/16'))
  t.true(Midnight.equals(date.nextDay(17), '2017/06/01'))
})

test('nextMonth', t => {
  let date = new Midnight('2016/08/01')
  t.true(Midnight.equals(date.nextMonth(), '2016/09/01'))

  t.true(Midnight.equals(date.nextMonth(1), '2016/09/01'))
  t.true(Midnight.equals(date.nextMonth(4), '2016/12/01'))
  t.true(Midnight.equals(date.nextMonth(5), '2017/01/01'))

  date = new Midnight('2016/08/15')
  t.true(Midnight.equals(date.nextMonth(-1), '2016/07/15'))
  t.true(Midnight.equals(date.nextMonth(0), '2016/08/15'))
  t.true(Midnight.equals(date.nextMonth(1), '2016/09/15'))

  date = new Midnight('2016/08/31')
  t.true(Midnight.equals(date.nextMonth(1), '2016/09/30'))
  t.true(Midnight.equals(date.nextMonth(6), '2017/02/28'))
  t.true(Midnight.equals(date.nextMonth(-2), '2016/06/30'))
})

test('nextYear', t => {
  let date = new Midnight('2016/05/15')
  t.true(Midnight.equals(date.nextYear(), '2017/05/15'))

  t.true(Midnight.equals(date.nextYear(-1), '2015/05/15'))
  t.true(Midnight.equals(date.nextYear(0), '2016/05/15'))
  t.true(Midnight.equals(date.nextYear(1), '2017/05/15'))

  date = new Midnight('2016/02/29')
  t.true(Midnight.equals(date.nextYear(-1), '2015/02/28'))
  t.true(Midnight.equals(date.nextYear(1), '2017/02/28'))
  t.true(Midnight.equals(date.nextYear(4), '2020/02/29'))
})

test('setHours', t => {
  const date = new Midnight('2016/05/20')
  const value = date.valueOf()
  t.is(date.setHours(1), value)
  t.is(date.getHours(), 0)
  date.setHours(-1)
  t.is(date.getHours(), 0)
  t.is(date.getDate(), 19)
})

test('setMinutes', t => {
  const date = new Midnight('2016/05/20')
  const value = date.valueOf()
  t.is(date.setMinutes(1), value)
  t.is(date.getMinutes(), 0)
})

test('setSeconds', t => {
  const date = new Midnight('2016/05/20')
  const value = date.valueOf()
  t.is(date.setSeconds(1), value)
  t.is(date.getSeconds(), 0)
})

test('setMilliseconds', t => {
  const date = new Midnight('2016/05/20')
  const value = date.valueOf()
  t.is(date.setMilliseconds(1), value)
  t.is(date.getMilliseconds(), 0)
})

test('setTime', t => {
  const d = new Date()
  const date = new Midnight(d)
  const time = date.getTime()
  date.setTime(d.getTime())
  t.is(date.getTime(), time)
})

test('startOfMonth', t => {
  t.true(Midnight.equals(new Midnight('2017/05/01').startOfMonth(), '2017/05/01'))
  t.true(Midnight.equals(new Midnight('2017/05/20').startOfMonth(), '2017/05/01'))
  t.true(Midnight.equals(new Midnight('2017/05/31').startOfMonth(), '2017/05/01'))
})

test('startOfYear', t => {
  t.true(Midnight.equals(new Midnight('2017/01/01').startOfYear(), '2017/01/01'))
  t.true(Midnight.equals(new Midnight('2017/05/15').startOfYear(), '2017/01/01'))
  t.true(Midnight.equals(new Midnight('2017/12/31').startOfYear(), '2017/01/01'))
  t.true(Midnight.equals(new Midnight('2018/01/01').startOfYear(), '2018/01/01'))
})

test('toObject', t => {
  const date = new Midnight('2017/05/20')
  t.deepEqual(date.toObject(), {year: 2017, month: 5, day: 20})
})

test('year', t => {
  let date = new Midnight('2017/05/20')
  t.is(date.year(), 2017)
  t.true(Midnight.equals(date.year(2016), '2016/05/20'))
  t.true(Midnight.equals(date.year(2018), '2018/05/20'))

  date = new Midnight('2016/02/29')
  t.true(Midnight.equals(date.year(2017), '2017/02/28'))
})

test('immutable', t => {
  const value = '2017/05/20'
  const date = new Midnight(value)
  date.day(1)
  t.true(Midnight.equals(date, value))
  date.month(1)
  t.true(Midnight.equals(date, value))
  date.year(2000)
  t.true(Midnight.equals(date, value))
  date.nextDay(1)
  t.true(Midnight.equals(date, value))
  date.nextMonth(1)
  t.true(Midnight.equals(date, value))
  date.nextYear(1)
  t.true(Midnight.equals(date, value))
  date.startOfMonth()
  t.true(Midnight.equals(date, value))
  date.startOfYear()
  t.true(Midnight.equals(date, value))
  date.endOfMonth()
  t.true(Midnight.equals(date, value))
  date.endOfYear()
  t.true(Midnight.equals(date, value))
})
