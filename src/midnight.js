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

const DAYS_PER_WEEK = 7

export default class Midnight extends Date{

  constructor(){
    if(arguments.length === 2){
      super(arguments[0], arguments[1] - 1)
    }else if(3 <= arguments.length){
      super(arguments[0], arguments[1] - 1, arguments[2])
    }else if(typeof arguments[0] === 'string'){
      super(arguments[0].replace(/\//g, '-'))
    }else{
      super(...arguments)
    }
    this._setTimeToZero()

    if(typeof arguments[0] === 'number'){
      // detect 0 to 99 → 1900 to 1999
      const converted = 1800 < this.getFullYear() - arguments[0]
      if(arguments.length === 1 || converted){
        this.setFullYear(arguments[0])
      }
    }

  }

  static equals(value1, value2){
    return new Midnight(value1).equals(value2)
  }

  static parse(value){
    if(typeof value === 'string'){
      if(value.match(/^\d{4}[-/.]\d{1,2}$/)){
        return this.parse(`${value}-01`)
      }else if(value.match(/^(\d{1,2})[-/.](\d{1,2})$/)){
        const year = Midnight.today().year()
        return this.parse(`${year}-${RegExp.$1}-${RegExp.$2}`)
      }else if(value.match(/^(\d{4})(\d{2})(\d{2})$/)){
        return this.parse(`${RegExp.$1}-${RegExp.$2}-${RegExp.$3}`)
      }else if(value.match(/^(\d{4})(\d{2})$/)){
        return this.parse(`${RegExp.$1}-${RegExp.$2}-01`)
      }else if(value.match(/^\d{4}$/)){
        return this.parse(`${value}-01-01`)
      }
    }
    const time = Date.parse(value)
    if(isNaN(time)){
      return null
    }
    const date = new Date(value)
    return new Midnight(date)
  }

  static today(){
    return new Midnight()
  }

  /**
   * Get day or set day.
   * @param {Number} day
   * @return {Number|Midnight} returns day (1-31) or new instance.
   * @example new Midnight('2018/05/15').day() // => 15
   * @example new Midnight('2018/05/15').day(20) // => 2018/05/20
   */
  day(day){
    if(arguments.length === 0){
      return this.getDate()
    }
    const o = this.toObject()
    return new Midnight(o.year, o.month, day)
  }

  /**
   * Get month or set month.
   * @param {Number} month
   * @return {Number|Midnight} returns month (1-12) or new instance.
   * @example new Midnight('2018/05/15').month() // => 5
   * @example new Midnight('2018/05/15').month(6) // => 2018/06/15
   */
  month(month){
    const o = this.toObject()
    if(arguments.length === 0){
      return o.month
    }
    const d1 = new Midnight(o.year, month, o.day)
    const d2 = new Midnight(o.year, month + 1, 0)
    return d1 < d2 ? d1 : d2
  }

  /**
   * Get year or set year.
   * @param {Number} year
   * @return {Number|Midnight} returns year or new instance.
   * @example new Midnight('2018/05/15').year() // => 2018
   * @example new Midnight('2018/05/15').year(2020) // => 2020/05/15
   */
  year(year){
    const o = this.toObject()
    if(arguments.length === 0){
      return o.year
    }
    const d1 = new Midnight(year, o.month, o.day)
    const d2 = new Midnight(year, o.month + 1, 0)
    return d1 < d2 ? d1 : d2
  }

  differenceInDays(value){
    if(!value){
      return NaN
    }
    return Math.floor((new Midnight(value) - this) / DAY)
  }

  /**
   * Returns start date of the month.
   * @returns {Midnight}
   * @example new Midnight('2018/05/15').startOfMonth() // => 2018/05/01
   */
  startOfMonth(){
    return this.day(1)
  }

  /**
   * Returns end date of the month.
   * @returns {Midnight}
   * @example new Midnight('2018/05/15').endOfMonth() // => 2018/05/31
   */
  endOfMonth(){
    return this.nextMonth(1).day(0)
  }

  /**
   * Returns start date of the year.
   * @returns {Midnight}
   * @example new Midnight('2018/05/15').startOfYear() // => 2018/01/01
   */
  startOfYear(){
    return this.month(1).day(1)
  }

  /**
   * Returns end date of the year.
   * @returns {Midnight}
   * @example new Midnight('2018/05/15').endOfYear() // => 2018/12/31
   */
  endOfYear(){
    return this.month(12).endOfMonth()
  }

  /**
   * Returns start date of the decade.
   * @returns {Midnight}
   * @example new Midnight('2018/05/15').startOfDecade() // => 2010/01/01
   */
  startOfDecade(){
    const year = Math.floor(this.year() / 10) * 10
    return new Midnight(year, 1, 1)
  }

  /**
   * Returns end date of the decade.
   * @returns {Midnight}
   * @example new Midnight('2018/05/15').endOfDecade() // => 2019/12/31
   */
  endOfDecade(){
    const year = Math.floor(this.year() / 10) * 10 + 9
    return new Midnight(year, 12, 31)
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
    const day = this.getDay()
    if(Object.is(times, 0)){
      if(day === dayOfWeek){
        return this.nextDay(0)
      }
      return this.nextDayOfWeek(dayOfWeek, 1)
    }else if(Object.is(times, -0)){
      if(day === dayOfWeek){
        return this.nextDay(0)
      }
      return this.nextDayOfWeek(dayOfWeek, -1)
    }

    const difference = (DAYS_PER_WEEK + dayOfWeek - day - 1) % DAYS_PER_WEEK + 1
    if(0 < times){
      return this.nextDay(difference + (times - 1) * DAYS_PER_WEEK)
    }else if(times < 0){
      return this.nextDay(difference + times * DAYS_PER_WEEK)
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

  /**
   * Returns true if this is today.
   * @returns {Boolean}
   */
  isToday(){
    return this.equals(new Date())
  }

  /**
   * Returns true if this is sunday.
   * @returns {Boolean}
   */
  isSunday(){
    return this.getDay() === SUNDAY
  }

  /**
   * Returns true if this is monday.
   * @returns {Boolean}
   */
  isMonday(){
    return this.getDay() === MONDAY
  }

  /**
   * Returns true if this is tuesday.
   * @returns {Boolean}
   */
  isTuesday(){
    return this.getDay() === TUESDAY
  }

  /**
   * Returns true if this is wednesday.
   * @returns {Boolean}
   */
  isWednesday(){
    return this.getDay() === WEDNESDAY
  }

  /**
   * Returns true if this is thursday.
   * @returns {Boolean}
   */
  isThursday(){
    return this.getDay() === THURSDAY
  }

  /**
   * Returns true if this is friday.
   * @returns {Boolean}
   */
  isFriday(){
    return this.getDay() === FRIDAY
  }

  /**
   * Returns true if this is saturday.
   * @returns {Boolean}
   */
  isSaturday(){
    return this.getDay() === SATURDAY
  }

  /**
   * Returns true if this is valid date.
   * @returns {Boolean}
   */
  isValid(){
    return !isNaN(this.getTime())
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

  toObject(){
    const year = this.getFullYear()
    const month = this.getMonth() + 1
    const day = this.getDate()
    return {year, month, day}
  }

  // private

  _setTimeToZero(){
    super.setHours(0)
    super.setMinutes(0)
    super.setSeconds(0)
    super.setMilliseconds(0)
  }

}
