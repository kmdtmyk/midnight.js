const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

const SUNDAY = 0
const MONDAY = 1
const TUESDAY = 2
const WEDNESDAY = 3
const THURSDAY = 4
const FRIDAY = 5
const SATURDAY = 6

export default class Midnight extends Date{

  constructor(){
    if(3 <= arguments.length){
      super(arguments[0], arguments[1] - 1, arguments[2])
    }else{
      super(...arguments)
    }
    this._setTimeToZero()
  }

  day(day){
    if(arguments.length === 0){
      return this.getDate()
    }
    const o = this.toObject()
    return new Midnight(o.year, o.month, day)
  }

  differenceInDays(value){
    if(!value){
      return NaN
    }
    return Math.floor((new Midnight(value) - this) / DAY)
  }

  endOfMonth(){
    return this.nextMonth(1).day(0)
  }

  endOfYear(){
    return this.month(12).endOfMonth()
  }

  equals(value){
    if(!value){
      return false
    }
    const date = new Date(value)
    return (
      this.getFullYear() === date.getFullYear() &&
      this.getMonth() === date.getMonth() &&
      this.getDate() === date.getDate()
    )
  }

  static equals(value1, value2){
    return new Midnight(value1).equals(value2)
  }

  month(month){
    const o = this.toObject()
    if(arguments.length === 0){
      return o.month
    }
    const d1 = new Midnight(o.year, month, o.day)
    const d2 = new Midnight(o.year, month + 1, 0)
    return d1 < d2 ? d1 : d2
  }

  nextDay(days = 1){
    return this.day(this.day() + days)
  }

  nextMonth(months = 1){
    return this.month(this.month() + months)
  }

  nextYear(years = 1){
    return this.year(this.year() + years)
  }

  nextDayOfWeek(dayOfWeek, times = 1){
    const dateDifference = (7 + dayOfWeek - this.getDay() - 1) % 7 + 1
    if(0 < times){
      return this.nextDay(dateDifference + (times - 1) * 7)
    }else if(times < 0){
      return this.nextDay(dateDifference + times * 7)
    }
  }

  nextSunday(times = 1){
    return this.nextDayOfWeek(SUNDAY, times)
  }

  nextMonday(times = 1){
    return this.nextDayOfWeek(MONDAY, times)
  }

  nextTuesday(times = 1){
    return this.nextDayOfWeek(TUESDAY, times)
  }

  nextWednesday(times = 1){
    return this.nextDayOfWeek(WEDNESDAY, times)
  }

  nextThursday(times = 1){
    return this.nextDayOfWeek(THURSDAY, times)
  }

  nextFriday(times = 1){
    return this.nextDayOfWeek(FRIDAY, times)
  }

  nextSaturday(times = 1){
    return this.nextDayOfWeek(SATURDAY, times)
  }

  isSunday(){
    return this.getDay() === SUNDAY
  }

  isMonday(){
    return this.getDay() === MONDAY
  }

  isTuesday(){
    return this.getDay() === TUESDAY
  }

  isWednesday(){
    return this.getDay() === WEDNESDAY
  }

  isThursday(){
    return this.getDay() === THURSDAY
  }

  isFriday(){
    return this.getDay() === FRIDAY
  }

  isSaturday(){
    return this.getDay() === SATURDAY
  }

  setHours(){
    super.setHours(...arguments)
    this._setTimeToZero()
    return this.valueOf()
  }

  setMinutes(){
    super.setMinutes(...arguments)
    this._setTimeToZero()
    return this.valueOf()
  }

  setSeconds(){
    super.setSeconds(...arguments)
    this._setTimeToZero()
    return this.valueOf()
  }

  setMilliseconds(){
    super.setMilliseconds(...arguments)
    this._setTimeToZero()
    return this.valueOf()
  }

  setTime(){
    super.setTime(...arguments)
    this._setTimeToZero()
    return this.valueOf()
  }

  startOfMonth(){
    return this.day(1)
  }

  startOfYear(){
    return this.month(1).day(1)
  }

  toObject(){
    const year = this.getFullYear()
    const month = this.getMonth() + 1
    const day = this.getDate()
    return {year, month, day}
  }

  year(year){
    const o = this.toObject()
    if(arguments.length === 0){
      return o.year
    }
    const d1 = new Midnight(year, o.month, o.day)
    const d2 = new Midnight(year, o.month + 1, 0)
    return d1 < d2 ? d1 : d2
  }

  // private

  _setTimeToZero(){
    super.setHours(0)
    super.setMinutes(0)
    super.setSeconds(0)
    super.setMilliseconds(0)
  }

}
