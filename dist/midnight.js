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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiNjllNjE2MDUzOGI1MTVmMmZlNyIsIndlYnBhY2s6Ly8vLi9zcmMvbWlkbmlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIk1pZG5pZ2h0IiwiRGF0ZSIsImNvbnN0cnVjdG9yIiwiYXJndW1lbnRzIiwiX2ZpeFRpbWUiLCJhZGREYXlzIiwiZGF5cyIsImRheSIsImFkZE1vbnRocyIsIm1vbnRocyIsIm1vbnRoIiwiYWRkWWVhcnMiLCJ5ZWFycyIsInllYXIiLCJjcmVhdGUiLCJsZW5ndGgiLCJnZXREYXRlIiwibyIsInRvT2JqZWN0IiwiZXF1YWxzIiwidmFsdWUiLCJkYXRlIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsInZhbHVlMSIsInZhbHVlMiIsImQxIiwiZDIiLCJzdGFydE9mTW9udGgiLCJzZXRIb3VycyIsInNldE1pbnV0ZXMiLCJzZXRTZWNvbmRzIiwic2V0TWlsbGlzZWNvbmRzIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7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QUFUO0FBQ0Q7QUFDRCxVQUFNYSxLQUFLMUIsU0FBU2MsTUFBVCxDQUFnQkQsSUFBaEIsRUFBc0JJLEVBQUVQLEtBQXhCLEVBQStCTyxFQUFFVixHQUFqQyxDQUFYO0FBQ0EsVUFBTW9CLEtBQUszQixTQUFTYyxNQUFULENBQWdCRCxJQUFoQixFQUFzQkksRUFBRVAsS0FBRixHQUFVLENBQWhDLEVBQW1DLENBQW5DLENBQVg7QUFDQSxXQUFPZ0IsS0FBS0MsRUFBTCxHQUFVRCxFQUFWLEdBQWVDLEVBQXRCO0FBQ0Q7O0FBRUR2QixhQUFVO0FBQ1IsVUFBTXlCLFFBQU4sQ0FBZSxDQUFmO0FBQ0EsVUFBTUMsVUFBTixDQUFpQixDQUFqQjtBQUNBLFVBQU1DLFVBQU4sQ0FBaUIsQ0FBakI7QUFDQSxVQUFNQyxlQUFOLENBQXNCLENBQXRCO0FBQ0Q7O0FBbkZ1QyxDOzs7Ozs7OztBQ0ExQ0MsT0FBT0MsT0FBUCxHQUFpQixtQkFBQUMsQ0FBUSxDQUFSLEVBQXNCQyxPQUF2QyxDIiwiZmlsZSI6Im1pZG5pZ2h0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiTWlkbmlnaHRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiTWlkbmlnaHRcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiNjllNjE2MDUzOGI1MTVmMmZlNyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pZG5pZ2h0IGV4dGVuZHMgRGF0ZXtcblxuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcbiAgICB0aGlzLl9maXhUaW1lKClcbiAgfVxuXG4gIGFkZERheXMoZGF5cyl7XG4gICAgcmV0dXJuIHRoaXMuZGF5KHRoaXMuZGF5KCkgKyBkYXlzKVxuICB9XG5cbiAgYWRkTW9udGhzKG1vbnRocyl7XG4gICAgcmV0dXJuIHRoaXMubW9udGgodGhpcy5tb250aCgpICsgbW9udGhzKVxuICB9XG5cbiAgYWRkWWVhcnMoeWVhcnMpe1xuICAgIHJldHVybiB0aGlzLnllYXIodGhpcy55ZWFyKCkgKyB5ZWFycylcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUoeWVhciwgbW9udGgsIGRheSl7XG4gICAgcmV0dXJuIG5ldyBNaWRuaWdodCh5ZWFyLCBtb250aCAtIDEsIGRheSlcbiAgfVxuXG4gIGRheShkYXkpe1xuICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApe1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZSgpXG4gICAgfVxuICAgIGNvbnN0IG8gPSB0aGlzLnRvT2JqZWN0KClcbiAgICByZXR1cm4gTWlkbmlnaHQuY3JlYXRlKG8ueWVhciwgby5tb250aCwgZGF5KVxuICB9XG5cbiAgZXF1YWxzKHZhbHVlKXtcbiAgICBpZighdmFsdWUpe1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh2YWx1ZSlcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5nZXRGdWxsWWVhcigpID09PSBkYXRlLmdldEZ1bGxZZWFyKCkgJiZcbiAgICAgIHRoaXMuZ2V0TW9udGgoKSA9PT0gZGF0ZS5nZXRNb250aCgpICYmXG4gICAgICB0aGlzLmdldERhdGUoKSA9PT0gZGF0ZS5nZXREYXRlKClcbiAgICApXG4gIH1cblxuICBzdGF0aWMgZXF1YWxzKHZhbHVlMSwgdmFsdWUyKXtcbiAgICByZXR1cm4gbmV3IE1pZG5pZ2h0KHZhbHVlMSkuZXF1YWxzKHZhbHVlMilcbiAgfVxuXG4gIG1vbnRoKG1vbnRoKXtcbiAgICBjb25zdCBvID0gdGhpcy50b09iamVjdCgpXG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCl7XG4gICAgICByZXR1cm4gby5tb250aFxuICAgIH1cbiAgICBjb25zdCBkMSA9IE1pZG5pZ2h0LmNyZWF0ZShvLnllYXIsIG1vbnRoLCBvLmRheSlcbiAgICBjb25zdCBkMiA9IE1pZG5pZ2h0LmNyZWF0ZShvLnllYXIsIG1vbnRoICsgMSwgMClcbiAgICByZXR1cm4gZDEgPCBkMiA/IGQxIDogZDJcbiAgfVxuXG4gIHN0YXJ0T2ZNb250aCgpe1xuICAgIHJldHVybiB0aGlzLmRheSgxKVxuICB9XG5cbiAgdG9PYmplY3QoKXtcbiAgICBjb25zdCB5ZWFyID0gdGhpcy5nZXRGdWxsWWVhcigpXG4gICAgY29uc3QgbW9udGggPSB0aGlzLmdldE1vbnRoKCkgKyAxXG4gICAgY29uc3QgZGF5ID0gdGhpcy5nZXREYXRlKClcbiAgICByZXR1cm4ge3llYXIsIG1vbnRoLCBkYXl9XG4gIH1cblxuICB5ZWFyKHllYXIpe1xuICAgIGNvbnN0IG8gPSB0aGlzLnRvT2JqZWN0KClcbiAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAwKXtcbiAgICAgIHJldHVybiBvLnllYXJcbiAgICB9XG4gICAgY29uc3QgZDEgPSBNaWRuaWdodC5jcmVhdGUoeWVhciwgby5tb250aCwgby5kYXkpXG4gICAgY29uc3QgZDIgPSBNaWRuaWdodC5jcmVhdGUoeWVhciwgby5tb250aCArIDEsIDApXG4gICAgcmV0dXJuIGQxIDwgZDIgPyBkMSA6IGQyXG4gIH1cblxuICBfZml4VGltZSgpe1xuICAgIHN1cGVyLnNldEhvdXJzKDApXG4gICAgc3VwZXIuc2V0TWludXRlcygwKVxuICAgIHN1cGVyLnNldFNlY29uZHMoMClcbiAgICBzdXBlci5zZXRNaWxsaXNlY29uZHMoMClcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWlkbmlnaHQuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbWlkbmlnaHQnKS5kZWZhdWx0XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9