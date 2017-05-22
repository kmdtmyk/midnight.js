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

  diffInDays(value) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4YmY2ZjY2NWFiZTAwNTYwYzFlYiIsIndlYnBhY2s6Ly8vLi9zcmMvbWlkbmlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIlNFQ09ORCIsIk1JTlVURSIsIkhPVVIiLCJEQVkiLCJNaWRuaWdodCIsIkRhdGUiLCJjb25zdHJ1Y3RvciIsImFyZ3VtZW50cyIsIl9maXhUaW1lIiwiYWRkRGF5cyIsImRheXMiLCJkYXkiLCJhZGRNb250aHMiLCJtb250aHMiLCJtb250aCIsImFkZFllYXJzIiwieWVhcnMiLCJ5ZWFyIiwiY3JlYXRlIiwibGVuZ3RoIiwiZ2V0RGF0ZSIsIm8iLCJ0b09iamVjdCIsImRpZmZJbkRheXMiLCJ2YWx1ZSIsIk5hTiIsIk1hdGgiLCJmbG9vciIsImVuZE9mTW9udGgiLCJlcXVhbHMiLCJkYXRlIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsInZhbHVlMSIsInZhbHVlMiIsImQxIiwiZDIiLCJzdGFydE9mTW9udGgiLCJzZXRIb3VycyIsInNldE1pbnV0ZXMiLCJzZXRTZWNvbmRzIiwic2V0TWlsbGlzZWNvbmRzIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ2hFQTtBQUFBLE1BQU1BLFNBQVMsSUFBZjtBQUNBLE1BQU1DLFNBQVNELFNBQVMsRUFBeEI7QUFDQSxNQUFNRSxPQUFPRCxTQUFTLEVBQXRCO0FBQ0EsTUFBTUUsTUFBTUQsT0FBTyxFQUFuQjs7QUFFZSxNQUFNRSxRQUFOLFNBQXVCQyxJQUF2QixDQUEyQjs7QUFFeENDLGdCQUFhO0FBQ1gsVUFBTSxHQUFHQyxTQUFUO0FBQ0EsU0FBS0MsUUFBTDtBQUNEOztBQUVEQyxVQUFRQyxJQUFSLEVBQWE7QUFDWCxXQUFPLEtBQUtDLEdBQUwsQ0FBUyxLQUFLQSxHQUFMLEtBQWFELElBQXRCLENBQVA7QUFDRDs7QUFFREUsWUFBVUMsTUFBVixFQUFpQjtBQUNmLFdBQU8sS0FBS0MsS0FBTCxDQUFXLEtBQUtBLEtBQUwsS0FBZUQsTUFBMUIsQ0FBUDtBQUNEOztBQUVERSxXQUFTQyxLQUFULEVBQWU7QUFDYixXQUFPLEtBQUtDLElBQUwsQ0FBVSxLQUFLQSxJQUFMLEtBQWNELEtBQXhCLENBQVA7QUFDRDs7QUFFRCxTQUFPRSxNQUFQLENBQWNELElBQWQsRUFBb0JILEtBQXBCLEVBQTJCSCxHQUEzQixFQUErQjtBQUM3QixXQUFPLElBQUlQLFFBQUosQ0FBYWEsSUFBYixFQUFtQkgsUUFBUSxDQUEzQixFQUE4QkgsR0FBOUIsQ0FBUDtBQUNEOztBQUVEQSxNQUFJQSxHQUFKLEVBQVE7QUFDTixRQUFHSixVQUFVWSxNQUFWLEtBQXFCLENBQXhCLEVBQTBCO0FBQ3hCLGFBQU8sS0FBS0MsT0FBTCxFQUFQO0FBQ0Q7QUFDRCxVQUFNQyxJQUFJLEtBQUtDLFFBQUwsRUFBVjtBQUNBLFdBQU9sQixTQUFTYyxNQUFULENBQWdCRyxFQUFFSixJQUFsQixFQUF3QkksRUFBRVAsS0FBMUIsRUFBaUNILEdBQWpDLENBQVA7QUFDRDs7QUFFRFksYUFBV0MsS0FBWCxFQUFpQjtBQUNmLFFBQUcsQ0FBQ0EsS0FBSixFQUFVO0FBQ1IsYUFBT0MsR0FBUDtBQUNEO0FBQ0QsV0FBT0MsS0FBS0MsS0FBTCxDQUFXLENBQUMsSUFBSXZCLFFBQUosQ0FBYW9CLEtBQWIsSUFBc0IsSUFBdkIsSUFBK0JyQixHQUExQyxDQUFQO0FBQ0Q7O0FBRUR5QixlQUFZO0FBQ1YsV0FBTyxLQUFLaEIsU0FBTCxDQUFlLENBQWYsRUFBa0JELEdBQWxCLENBQXNCLENBQXRCLENBQVA7QUFDRDs7QUFFRGtCLFNBQU9MLEtBQVAsRUFBYTtBQUNYLFFBQUcsQ0FBQ0EsS0FBSixFQUFVO0FBQ1IsYUFBTyxLQUFQO0FBQ0Q7QUFDRCxVQUFNTSxPQUFPLElBQUl6QixJQUFKLENBQVNtQixLQUFULENBQWI7QUFDQSxXQUNFLEtBQUtPLFdBQUwsT0FBdUJELEtBQUtDLFdBQUwsRUFBdkIsSUFDQSxLQUFLQyxRQUFMLE9BQW9CRixLQUFLRSxRQUFMLEVBRHBCLElBRUEsS0FBS1osT0FBTCxPQUFtQlUsS0FBS1YsT0FBTCxFQUhyQjtBQUtEOztBQUVELFNBQU9TLE1BQVAsQ0FBY0ksTUFBZCxFQUFzQkMsTUFBdEIsRUFBNkI7QUFDM0IsV0FBTyxJQUFJOUIsUUFBSixDQUFhNkIsTUFBYixFQUFxQkosTUFBckIsQ0FBNEJLLE1BQTVCLENBQVA7QUFDRDs7QUFFRHBCLFFBQU1BLEtBQU4sRUFBWTtBQUNWLFVBQU1PLElBQUksS0FBS0MsUUFBTCxFQUFWO0FBQ0EsUUFBR2YsVUFBVVksTUFBVixLQUFxQixDQUF4QixFQUEwQjtBQUN4QixhQUFPRSxFQUFFUCxLQUFUO0FBQ0Q7QUFDRCxVQUFNcUIsS0FBSy9CLFNBQVNjLE1BQVQsQ0FBZ0JHLEVBQUVKLElBQWxCLEVBQXdCSCxLQUF4QixFQUErQk8sRUFBRVYsR0FBakMsQ0FBWDtBQUNBLFVBQU15QixLQUFLaEMsU0FBU2MsTUFBVCxDQUFnQkcsRUFBRUosSUFBbEIsRUFBd0JILFFBQVEsQ0FBaEMsRUFBbUMsQ0FBbkMsQ0FBWDtBQUNBLFdBQU9xQixLQUFLQyxFQUFMLEdBQVVELEVBQVYsR0FBZUMsRUFBdEI7QUFDRDs7QUFFREMsaUJBQWM7QUFDWixXQUFPLEtBQUsxQixHQUFMLENBQVMsQ0FBVCxDQUFQO0FBQ0Q7O0FBRURXLGFBQVU7QUFDUixVQUFNTCxPQUFPLEtBQUtjLFdBQUwsRUFBYjtBQUNBLFVBQU1qQixRQUFRLEtBQUtrQixRQUFMLEtBQWtCLENBQWhDO0FBQ0EsVUFBTXJCLE1BQU0sS0FBS1MsT0FBTCxFQUFaO0FBQ0EsV0FBTyxFQUFDSCxJQUFELEVBQU9ILEtBQVAsRUFBY0gsR0FBZCxFQUFQO0FBQ0Q7O0FBRURNLE9BQUtBLElBQUwsRUFBVTtBQUNSLFVBQU1JLElBQUksS0FBS0MsUUFBTCxFQUFWO0FBQ0EsUUFBR2YsVUFBVVksTUFBVixLQUFxQixDQUF4QixFQUEwQjtBQUN4QixhQUFPRSxFQUFFSixJQUFUO0FBQ0Q7QUFDRCxVQUFNa0IsS0FBSy9CLFNBQVNjLE1BQVQsQ0FBZ0JELElBQWhCLEVBQXNCSSxFQUFFUCxLQUF4QixFQUErQk8sRUFBRVYsR0FBakMsQ0FBWDtBQUNBLFVBQU15QixLQUFLaEMsU0FBU2MsTUFBVCxDQUFnQkQsSUFBaEIsRUFBc0JJLEVBQUVQLEtBQUYsR0FBVSxDQUFoQyxFQUFtQyxDQUFuQyxDQUFYO0FBQ0EsV0FBT3FCLEtBQUtDLEVBQUwsR0FBVUQsRUFBVixHQUFlQyxFQUF0QjtBQUNEOztBQUVENUIsYUFBVTtBQUNSLFVBQU04QixRQUFOLENBQWUsQ0FBZjtBQUNBLFVBQU1DLFVBQU4sQ0FBaUIsQ0FBakI7QUFDQSxVQUFNQyxVQUFOLENBQWlCLENBQWpCO0FBQ0EsVUFBTUMsZUFBTixDQUFzQixDQUF0QjtBQUNEOztBQTlGdUMsQzs7Ozs7Ozs7QUNMMUNDLE9BQU9DLE9BQVAsR0FBaUIsbUJBQUFDLENBQVEsQ0FBUixFQUFzQkMsT0FBdkMsQyIsImZpbGUiOiJtaWRuaWdodC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk1pZG5pZ2h0XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIk1pZG5pZ2h0XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOGJmNmY2NjVhYmUwMDU2MGMxZWIiLCJjb25zdCBTRUNPTkQgPSAxMDAwXG5jb25zdCBNSU5VVEUgPSBTRUNPTkQgKiA2MFxuY29uc3QgSE9VUiA9IE1JTlVURSAqIDYwXG5jb25zdCBEQVkgPSBIT1VSICogMjRcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWlkbmlnaHQgZXh0ZW5kcyBEYXRle1xuXG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKVxuICAgIHRoaXMuX2ZpeFRpbWUoKVxuICB9XG5cbiAgYWRkRGF5cyhkYXlzKXtcbiAgICByZXR1cm4gdGhpcy5kYXkodGhpcy5kYXkoKSArIGRheXMpXG4gIH1cblxuICBhZGRNb250aHMobW9udGhzKXtcbiAgICByZXR1cm4gdGhpcy5tb250aCh0aGlzLm1vbnRoKCkgKyBtb250aHMpXG4gIH1cblxuICBhZGRZZWFycyh5ZWFycyl7XG4gICAgcmV0dXJuIHRoaXMueWVhcih0aGlzLnllYXIoKSArIHllYXJzKVxuICB9XG5cbiAgc3RhdGljIGNyZWF0ZSh5ZWFyLCBtb250aCwgZGF5KXtcbiAgICByZXR1cm4gbmV3IE1pZG5pZ2h0KHllYXIsIG1vbnRoIC0gMSwgZGF5KVxuICB9XG5cbiAgZGF5KGRheSl7XG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCl7XG4gICAgICByZXR1cm4gdGhpcy5nZXREYXRlKClcbiAgICB9XG4gICAgY29uc3QgbyA9IHRoaXMudG9PYmplY3QoKVxuICAgIHJldHVybiBNaWRuaWdodC5jcmVhdGUoby55ZWFyLCBvLm1vbnRoLCBkYXkpXG4gIH1cblxuICBkaWZmSW5EYXlzKHZhbHVlKXtcbiAgICBpZighdmFsdWUpe1xuICAgICAgcmV0dXJuIE5hTlxuICAgIH1cbiAgICByZXR1cm4gTWF0aC5mbG9vcigobmV3IE1pZG5pZ2h0KHZhbHVlKSAtIHRoaXMpIC8gREFZKVxuICB9XG5cbiAgZW5kT2ZNb250aCgpe1xuICAgIHJldHVybiB0aGlzLmFkZE1vbnRocygxKS5kYXkoMClcbiAgfVxuXG4gIGVxdWFscyh2YWx1ZSl7XG4gICAgaWYoIXZhbHVlKXtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodmFsdWUpXG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZS5nZXRGdWxsWWVhcigpICYmXG4gICAgICB0aGlzLmdldE1vbnRoKCkgPT09IGRhdGUuZ2V0TW9udGgoKSAmJlxuICAgICAgdGhpcy5nZXREYXRlKCkgPT09IGRhdGUuZ2V0RGF0ZSgpXG4gICAgKVxuICB9XG5cbiAgc3RhdGljIGVxdWFscyh2YWx1ZTEsIHZhbHVlMil7XG4gICAgcmV0dXJuIG5ldyBNaWRuaWdodCh2YWx1ZTEpLmVxdWFscyh2YWx1ZTIpXG4gIH1cblxuICBtb250aChtb250aCl7XG4gICAgY29uc3QgbyA9IHRoaXMudG9PYmplY3QoKVxuICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApe1xuICAgICAgcmV0dXJuIG8ubW9udGhcbiAgICB9XG4gICAgY29uc3QgZDEgPSBNaWRuaWdodC5jcmVhdGUoby55ZWFyLCBtb250aCwgby5kYXkpXG4gICAgY29uc3QgZDIgPSBNaWRuaWdodC5jcmVhdGUoby55ZWFyLCBtb250aCArIDEsIDApXG4gICAgcmV0dXJuIGQxIDwgZDIgPyBkMSA6IGQyXG4gIH1cblxuICBzdGFydE9mTW9udGgoKXtcbiAgICByZXR1cm4gdGhpcy5kYXkoMSlcbiAgfVxuXG4gIHRvT2JqZWN0KCl7XG4gICAgY29uc3QgeWVhciA9IHRoaXMuZ2V0RnVsbFllYXIoKVxuICAgIGNvbnN0IG1vbnRoID0gdGhpcy5nZXRNb250aCgpICsgMVxuICAgIGNvbnN0IGRheSA9IHRoaXMuZ2V0RGF0ZSgpXG4gICAgcmV0dXJuIHt5ZWFyLCBtb250aCwgZGF5fVxuICB9XG5cbiAgeWVhcih5ZWFyKXtcbiAgICBjb25zdCBvID0gdGhpcy50b09iamVjdCgpXG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCl7XG4gICAgICByZXR1cm4gby55ZWFyXG4gICAgfVxuICAgIGNvbnN0IGQxID0gTWlkbmlnaHQuY3JlYXRlKHllYXIsIG8ubW9udGgsIG8uZGF5KVxuICAgIGNvbnN0IGQyID0gTWlkbmlnaHQuY3JlYXRlKHllYXIsIG8ubW9udGggKyAxLCAwKVxuICAgIHJldHVybiBkMSA8IGQyID8gZDEgOiBkMlxuICB9XG5cbiAgX2ZpeFRpbWUoKXtcbiAgICBzdXBlci5zZXRIb3VycygwKVxuICAgIHN1cGVyLnNldE1pbnV0ZXMoMClcbiAgICBzdXBlci5zZXRTZWNvbmRzKDApXG4gICAgc3VwZXIuc2V0TWlsbGlzZWNvbmRzKDApXG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21pZG5pZ2h0LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL21pZG5pZ2h0JykuZGVmYXVsdFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==