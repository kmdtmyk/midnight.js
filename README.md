[![Build Status](https://travis-ci.org/kmdtmyk/midnight.js.svg?branch=master)](https://travis-ci.org/kmdtmyk/midnight.js)

# Midnight

A javascript library that deals with date only not datetime.

## Installation

```
npm install @kmdtmyk/midnight
```

## Usage

This is a subclass of Date, but the time is always 00:00:00.

```javascript
import Midnight from '@kmdtmyk/midnight'

const date = new Midnight(2017, 5 , 15) // => 2017/05/15 (month is 1-12 not 0-11)
date instanceof Date // => true
date.getHours() // => 0
date.getMinutes() // => 0
date.getSeconds() // => 0
date.getMilliseconds() // => 0
```

### Methods added

```javascript
const date = new Midnight(2017, 5 , 15)

date.day() // => 15
date.day(10) // => 2017/05/10

date.month() // => 5
date.month(8) // => 2017/08/15

date.year() // => 2017
date.year(2020) // => 2020/05/15

date.startOfMonth() // => 2017/05/01
date.endOfMonth() // => 2017/05/31

date.startOfYear() // => 2017/01/01
date.endOfYear() // => 2017/12/31

date.startOfDecade() // => 2010/01/01
date.endOfDecade() // => 2019/12/31

date.nextDay() // => 2017/05/16
date.nextDay(3) // => 2017/05/18

date.nextMonth() // => 2017/06/15
date.nextMonth(3) // => 2017/08/15

date.nextYear() // => 2018/05/15
date.nextYear(3) // => 2020/05/15

date.nextSunday() // => 2017/05/21
date.nextMonday() // => 2017/05/22
date.nexTuesday() // => 2017/05/16
date.nextWednesday() // => 2017/05/17
date.nextThursday() // => 2017/05/18
date.nextFriday() // => 2017/05/19
date.nextSaturday() // => 2017/05/20

date.isSunday() // => false
date.isMonday() // => true
date.isTuesday() // => false
date.isWednesday() // => false
date.isThursday() // => false
date.isFriday() // => false
date.isSaturday() // => false

date.isValid() // => true
```

```javascript
const date = Midnight.parse('2017/05/10')
// => 2017/05/10 not 1494342000000
```

### Immutable

These methods return new instance and don't change own state.

```javascript
const date1 = new Midnight(2017, 5 , 15)
const date2 = date1.nextDay()
// => date1: 2017/05/15 not 2017/05/16
// => date2: 2017/05/16
```

## License

MIT
