(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Midnight"] = factory();
	else
		root["Midnight"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

class Midnight extends Date {

  constructor() {
    super(...arguments);
    this._fixTime();
  }

  addDays(days) {
    return this.day(this.day() + days);
  }

  addMonths(months) {
    return this.month(this.month() + months);
  }

  addYears(years) {
    return this.year(this.year() + years);
  }

  static create(year, month, day) {
    return new Midnight(year, month - 1, day);
  }

  day(day) {
    if (arguments.length === 0) {
      return this.getDate();
    }
    const o = this.toObject();
    return Midnight.create(o.year, o.month, day);
  }

  differenceInDays(value) {
    if (!value) {
      return NaN;
    }
    return Math.floor((new Midnight(value) - this) / DAY);
  }

  endOfMonth() {
    return this.addMonths(1).day(0);
  }

  equals(value) {
    if (!value) {
      return false;
    }
    const date = new Date(value);
    return this.getFullYear() === date.getFullYear() && this.getMonth() === date.getMonth() && this.getDate() === date.getDate();
  }

  static equals(value1, value2) {
    return new Midnight(value1).equals(value2);
  }

  month(month) {
    const o = this.toObject();
    if (arguments.length === 0) {
      return o.month;
    }
    const d1 = Midnight.create(o.year, month, o.day);
    const d2 = Midnight.create(o.year, month + 1, 0);
    return d1 < d2 ? d1 : d2;
  }

  startOfMonth() {
    return this.day(1);
  }

  toObject() {
    const year = this.getFullYear();
    const month = this.getMonth() + 1;
    const day = this.getDate();
    return { year, month, day };
  }

  year(year) {
    const o = this.toObject();
    if (arguments.length === 0) {
      return o.year;
    }
    const d1 = Midnight.create(year, o.month, o.day);
    const d2 = Midnight.create(year, o.month + 1, 0);
    return d1 < d2 ? d1 : d2;
  }

  _fixTime() {
    super.setHours(0);
    super.setMinutes(0);
    super.setSeconds(0);
    super.setMilliseconds(0);
  }

}
/* harmony export (immutable) */ __webpack_exports__["default"] = Midnight;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0).default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3NTUwMDFjMjhlM2FkYjQxZDQzYSIsIndlYnBhY2s6Ly8vLi9zcmMvbWlkbmlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIlNFQ09ORCIsIk1JTlVURSIsIkhPVVIiLCJEQVkiLCJNaWRuaWdodCIsIkRhdGUiLCJjb25zdHJ1Y3RvciIsImFyZ3VtZW50cyIsIl9maXhUaW1lIiwiYWRkRGF5cyIsImRheXMiLCJkYXkiLCJhZGRNb250aHMiLCJtb250aHMiLCJtb250aCIsImFkZFllYXJzIiwieWVhcnMiLCJ5ZWFyIiwiY3JlYXRlIiwibGVuZ3RoIiwiZ2V0RGF0ZSIsIm8iLCJ0b09iamVjdCIsImRpZmZlcmVuY2VJbkRheXMiLCJ2YWx1ZSIsIk5hTiIsIk1hdGgiLCJmbG9vciIsImVuZE9mTW9udGgiLCJlcXVhbHMiLCJkYXRlIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsInZhbHVlMSIsInZhbHVlMiIsImQxIiwiZDIiLCJzdGFydE9mTW9udGgiLCJzZXRIb3VycyIsInNldE1pbnV0ZXMiLCJzZXRTZWNvbmRzIiwic2V0TWlsbGlzZWNvbmRzIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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anMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJNaWRuaWdodFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJNaWRuaWdodFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDc1NTAwMWMyOGUzYWRiNDFkNDNhIiwiY29uc3QgU0VDT05EID0gMTAwMFxuY29uc3QgTUlOVVRFID0gU0VDT05EICogNjBcbmNvbnN0IEhPVVIgPSBNSU5VVEUgKiA2MFxuY29uc3QgREFZID0gSE9VUiAqIDI0XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pZG5pZ2h0IGV4dGVuZHMgRGF0ZXtcblxuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcbiAgICB0aGlzLl9maXhUaW1lKClcbiAgfVxuXG4gIGFkZERheXMoZGF5cyl7XG4gICAgcmV0dXJuIHRoaXMuZGF5KHRoaXMuZGF5KCkgKyBkYXlzKVxuICB9XG5cbiAgYWRkTW9udGhzKG1vbnRocyl7XG4gICAgcmV0dXJuIHRoaXMubW9udGgodGhpcy5tb250aCgpICsgbW9udGhzKVxuICB9XG5cbiAgYWRkWWVhcnMoeWVhcnMpe1xuICAgIHJldHVybiB0aGlzLnllYXIodGhpcy55ZWFyKCkgKyB5ZWFycylcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUoeWVhciwgbW9udGgsIGRheSl7XG4gICAgcmV0dXJuIG5ldyBNaWRuaWdodCh5ZWFyLCBtb250aCAtIDEsIGRheSlcbiAgfVxuXG4gIGRheShkYXkpe1xuICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApe1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZSgpXG4gICAgfVxuICAgIGNvbnN0IG8gPSB0aGlzLnRvT2JqZWN0KClcbiAgICByZXR1cm4gTWlkbmlnaHQuY3JlYXRlKG8ueWVhciwgby5tb250aCwgZGF5KVxuICB9XG5cbiAgZGlmZmVyZW5jZUluRGF5cyh2YWx1ZSl7XG4gICAgaWYoIXZhbHVlKXtcbiAgICAgIHJldHVybiBOYU5cbiAgICB9XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKG5ldyBNaWRuaWdodCh2YWx1ZSkgLSB0aGlzKSAvIERBWSlcbiAgfVxuXG4gIGVuZE9mTW9udGgoKXtcbiAgICByZXR1cm4gdGhpcy5hZGRNb250aHMoMSkuZGF5KDApXG4gIH1cblxuICBlcXVhbHModmFsdWUpe1xuICAgIGlmKCF2YWx1ZSl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHZhbHVlKVxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmdldEZ1bGxZZWFyKCkgPT09IGRhdGUuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgdGhpcy5nZXRNb250aCgpID09PSBkYXRlLmdldE1vbnRoKCkgJiZcbiAgICAgIHRoaXMuZ2V0RGF0ZSgpID09PSBkYXRlLmdldERhdGUoKVxuICAgIClcbiAgfVxuXG4gIHN0YXRpYyBlcXVhbHModmFsdWUxLCB2YWx1ZTIpe1xuICAgIHJldHVybiBuZXcgTWlkbmlnaHQodmFsdWUxKS5lcXVhbHModmFsdWUyKVxuICB9XG5cbiAgbW9udGgobW9udGgpe1xuICAgIGNvbnN0IG8gPSB0aGlzLnRvT2JqZWN0KClcbiAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAwKXtcbiAgICAgIHJldHVybiBvLm1vbnRoXG4gICAgfVxuICAgIGNvbnN0IGQxID0gTWlkbmlnaHQuY3JlYXRlKG8ueWVhciwgbW9udGgsIG8uZGF5KVxuICAgIGNvbnN0IGQyID0gTWlkbmlnaHQuY3JlYXRlKG8ueWVhciwgbW9udGggKyAxLCAwKVxuICAgIHJldHVybiBkMSA8IGQyID8gZDEgOiBkMlxuICB9XG5cbiAgc3RhcnRPZk1vbnRoKCl7XG4gICAgcmV0dXJuIHRoaXMuZGF5KDEpXG4gIH1cblxuICB0b09iamVjdCgpe1xuICAgIGNvbnN0IHllYXIgPSB0aGlzLmdldEZ1bGxZZWFyKClcbiAgICBjb25zdCBtb250aCA9IHRoaXMuZ2V0TW9udGgoKSArIDFcbiAgICBjb25zdCBkYXkgPSB0aGlzLmdldERhdGUoKVxuICAgIHJldHVybiB7eWVhciwgbW9udGgsIGRheX1cbiAgfVxuXG4gIHllYXIoeWVhcil7XG4gICAgY29uc3QgbyA9IHRoaXMudG9PYmplY3QoKVxuICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApe1xuICAgICAgcmV0dXJuIG8ueWVhclxuICAgIH1cbiAgICBjb25zdCBkMSA9IE1pZG5pZ2h0LmNyZWF0ZSh5ZWFyLCBvLm1vbnRoLCBvLmRheSlcbiAgICBjb25zdCBkMiA9IE1pZG5pZ2h0LmNyZWF0ZSh5ZWFyLCBvLm1vbnRoICsgMSwgMClcbiAgICByZXR1cm4gZDEgPCBkMiA/IGQxIDogZDJcbiAgfVxuXG4gIF9maXhUaW1lKCl7XG4gICAgc3VwZXIuc2V0SG91cnMoMClcbiAgICBzdXBlci5zZXRNaW51dGVzKDApXG4gICAgc3VwZXIuc2V0U2Vjb25kcygwKVxuICAgIHN1cGVyLnNldE1pbGxpc2Vjb25kcygwKVxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9taWRuaWdodC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9taWRuaWdodCcpLmRlZmF1bHRcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=