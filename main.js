/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
    /******/ 	"use strict";
    /******/ 	var __webpack_modules__ = ({

        /***/ "./src/index.js":
        /*!**********************!*\
          !*** ./src/index.js ***!
          \**********************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.scss */ \"./src/styles/main.scss\");\n/* harmony import */ var _styles_visual_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/visual.scss */ \"./src/styles/visual.scss\");\n/* harmony import */ var _styles_input_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/input.scss */ \"./src/styles/input.scss\");\n/* harmony import */ var _styles_chatacteristic_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/chatacteristic.scss */ \"./src/styles/chatacteristic.scss\");\n/* harmony import */ var _js_drawSpring__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/drawSpring */ \"./src/js/drawSpring.js\");\n/* harmony import */ var _js_drawPeace__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/drawPeace */ \"./src/js/drawPeace.js\");\n/* harmony import */ var _js_getCircleY__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/getCircleY */ \"./src/js/getCircleY.js\");\n\n\n\n\n\n\n\nconst weight = document.getElementById('weight'); // масса груза (m)\n\nlet m = weight.value;\nconst rigidity = document.getElementById('rigidity'); // жесткость пружины (k)\n\nlet k = rigidity.value;\nconst delta = document.getElementById('delta'); // амплитуда, начальное отклонение пружины от равновесия\n\nlet x0 = delta.value;\nconst spring = document.getElementById('polyline');\nlet points = spring.getAttribute('points'); // координаты пружины\n\nlet springPointsPeace = (0,_js_drawPeace__WEBPACK_IMPORTED_MODULE_5__.drawPeace)(x0, points); // координаты не растянутой пружины в состоянии покоя при x==0\n\nconst circle = document.getElementById('circle'); // круг (груз)\n\nlet circle_cy = circle.getAttribute('cy'); // Начальная координата центра шара по оси Y\n\nlet radius = Math.cbrt(m * 100000) / 2; // радиус груза\n\nlet T = 2 * Math.PI / Math.sqrt(k / m); // Период колебаний\n\nconst time = document.getElementById('time'); // Время колебаний\n\nconst charact_count = document.getElementById('count');\nlet count = 0; // количество циклов колебания\n\nconst charact_w0 = document.getElementById('w0'); // циклическая частота собственных колебаний\n\ncharact_w0.innerText = hesitation();\nconst charact_x = document.getElementById('x'); // координата положение груза относительно положения равновесия\n// циклическая частота\n\nfunction hesitation() {\n  let w0 = Math.sqrt(k / m);\n  return w0.toLocaleString();\n}\n\nweight.addEventListener('change', () => {\n  m = weight.value;\n  radius = Math.cbrt(m * 100000) / 2; // радиус груза\n\n  spring.setAttribute('points', points);\n  circle_cy = (0,_js_getCircleY__WEBPACK_IMPORTED_MODULE_6__.getCircleY)(points); // получить хвост пружины (последнюю координату пружины)\n\n  circle.setAttribute('cy', (parseInt(circle_cy) + radius).toString()); // красиво сдвинем шар по оси Y\n\n  circle.setAttribute('r', radius.toString());\n  T = 2 * Math.PI / Math.sqrt(k / m);\n  charact_w0.innerText = hesitation();\n});\nrigidity.addEventListener('change', () => {\n  k = rigidity.value;\n  T = 2 * Math.PI / Math.sqrt(k / m);\n  charact_w0.innerText = hesitation();\n});\ndelta.addEventListener('change', () => {\n  x0 = delta.value;\n  points = (0,_js_drawSpring__WEBPACK_IMPORTED_MODULE_4__.drawSpring)(x0, springPointsPeace);\n  spring.setAttribute('points', points);\n  circle_cy = (0,_js_getCircleY__WEBPACK_IMPORTED_MODULE_6__.getCircleY)(points);\n  circle.setAttribute('cy', (parseInt(circle_cy) + radius).toString());\n}); // ********* Блок анимации пружины ************** //\n\nlet myAnimation;\nlet timeStart; // время начала анимации\n\nlet timePassed; // времени прошло с момента запуска анимации\n\nlet stop = false; // флаг нажатия кнопки стоп, нужна для остановки Интервала и фиксации координаты X в момент времени нажатия\n\nfunction springAnimation() {\n  let coord_X; // координата груза в момент времен t относительно состояния покоя\n\n  let timer = setInterval(function () {\n    timePassed = (new Date() - timeStart) / 1000; // сколько времени прошло с начала анимации в ms\n\n    if (timePassed > T * 1000 || stop === true) {\n      // если времени прошло больше чем период, то удавяем интервал\n      clearInterval(timer);\n      return;\n    }\n\n    coord_X = x0 * Math.cos(Math.sqrt(k / m) * timePassed); // формура уравнения незатухающих колебаний (из мат модели)\n\n    charact_x.innerText = coord_X.toFixed(2) + ' см.'; // положение груза относительно состояния покоя + -\n\n    time.innerText = timePassed.toFixed(1) + ' сек.'; // время\n\n    count = timePassed / T; // количество колебаний\n\n    charact_count.innerText = Math.trunc(count).toString(); // количество полных колебаний - вывод в окно характеристик\n\n    draw(coord_X); // перерисовывыаем пружину в новой точке\n  }, 20);\n} // Принимает координату X (отклонение +- от состояния равновесия) и перерисовывает пружину с грузом\n\n\nfunction draw(x) {\n  let newPoints = (0,_js_drawSpring__WEBPACK_IMPORTED_MODULE_4__.drawSpring)(x, springPointsPeace);\n  spring.setAttribute('points', newPoints);\n  circle_cy = (0,_js_getCircleY__WEBPACK_IMPORTED_MODULE_6__.getCircleY)(newPoints);\n  circle.setAttribute('cy', (parseInt(circle_cy) + radius).toString());\n}\n\nfunction startAnimation() {\n  if (parseInt(x0) !== 0) {\n    // Не запускаем анимацию если пружина в состоянии покоя - не оттянута вниз\n    if (button.innerText.toLocaleUpperCase() === 'PLAY') {\n      stop = false;\n      timeStart = new Date();\n      springAnimation(T * 1000);\n      myAnimation = setInterval(springAnimation, T * 1000);\n      button.innerText = 'STOP';\n      weight.setAttribute('disabled', 'disabled'); // Блокируем возможность менять параметры во время анимации\n\n      rigidity.setAttribute('disabled', 'disabled');\n      delta.setAttribute('disabled', 'disabled');\n      charact_count.innerText = '0';\n      time.innerText = '0.0 сек.';\n      charact_x.innerText = '0.00 см.';\n    } else if (button.innerText.toLocaleUpperCase() === 'STOP') {\n      stop = true;\n      button.innerText = 'PLAY';\n      clearInterval(myAnimation);\n      weight.removeAttribute('disabled');\n      rigidity.removeAttribute('disabled');\n      delta.removeAttribute('disabled');\n      count = 0;\n    }\n  }\n}\n\nconst button = document.getElementById('btn_play');\nbutton.addEventListener(\"click\", startAnimation);\n\n//# sourceURL=webpack://springPendulum/./src/index.js?");

            /***/ }),

        /***/ "./src/js/drawPeace.js":
        /*!*****************************!*\
          !*** ./src/js/drawPeace.js ***!
          \*****************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"drawPeace\": () => (/* binding */ drawPeace)\n/* harmony export */ });\n// Функция возвращает координаты пружины в состоянии покоя т.е. при х0 = 0\nfunction drawPeace(x0, points) {\n  let pointsArray = points.split(' ');\n  let newArray = [pointsArray[0], pointsArray[1]];\n\n  for (let i = 2; i < pointsArray.length; i++) {\n    let pointArray = pointsArray[i].split(',');\n    let newPoint = pointArray[0] + \",\" + (pointArray[1] - parseInt(x0));\n    newArray.push(newPoint);\n  }\n\n  return newArray;\n}\n\n//# sourceURL=webpack://springPendulum/./src/js/drawPeace.js?");

            /***/ }),

        /***/ "./src/js/drawSpring.js":
        /*!******************************!*\
          !*** ./src/js/drawSpring.js ***!
          \******************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"drawSpring\": () => (/* binding */ drawSpring)\n/* harmony export */ });\n// Функция получает массив точек пружины и возвращает измененный на дельту x0\nfunction drawSpring(x0, springArray) {\n  let polyline = [springArray[0], springArray[1]];\n\n  for (let i = 2; i < springArray.length; i++) {\n    let pointArray = springArray[i].split(',');\n    let newPoint = pointArray[0] + ',' + Math.trunc(parseInt(pointArray[1]) + parseInt(x0));\n\n    if (i < 4) {\n      newPoint = pointArray[0] + ',' + Math.trunc(parseInt(pointArray[1]) + x0 / 4);\n      polyline.push(newPoint);\n    }\n\n    if (i >= 4 && i < 6) {\n      newPoint = pointArray[0] + ',' + Math.trunc(parseInt(pointArray[1]) + x0 / 2);\n      polyline.push(newPoint);\n    }\n\n    if (i >= 6) {\n      newPoint = pointArray[0] + ',' + Math.trunc(parseInt(pointArray[1]) + parseInt(x0));\n      polyline.push(newPoint);\n    }\n  }\n\n  return polyline.join(' ');\n}\n\n//# sourceURL=webpack://springPendulum/./src/js/drawSpring.js?");

            /***/ }),

        /***/ "./src/js/getCircleY.js":
        /*!******************************!*\
          !*** ./src/js/getCircleY.js ***!
          \******************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCircleY\": () => (/* binding */ getCircleY)\n/* harmony export */ });\n// Функция принимает параметром строку координат пружины и возвращает последнюю координату Y -  центр груза\nfunction getCircleY(spring) {\n  let springArr = spring.split(' ');\n  let points = springArr[springArr.length - 1];\n  let y = points.split(',');\n  return y[1];\n}\n\n//# sourceURL=webpack://springPendulum/./src/js/getCircleY.js?");

            /***/ }),

        /***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/chatacteristic.scss":
        /*!*********************************************************************************************************************!*\
          !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/chatacteristic.scss ***!
          \*********************************************************************************************************************/
        /***/ ((module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".characteristic section {\\n  padding: 6px; }\\n  .characteristic section span {\\n    font-weight: bold; }\\n  .characteristic section .characteristic_card {\\n    font-weight: bold; }\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://springPendulum/./src/styles/chatacteristic.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

            /***/ }),

        /***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/input.scss":
        /*!************************************************************************************************************!*\
          !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/input.scss ***!
          \************************************************************************************************************/
        /***/ ((module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".input_container {\\n  margin: 10px 0 30px 0;\\n  display: flex;\\n  flex-wrap: wrap;\\n  justify-content: center; }\\n  .input_container input, .input_container label {\\n    text-align: center;\\n    width: 80%;\\n    margin-bottom: 5px; }\\n\\n#weight::before {\\n  content: \\\"0.5\\\";\\n  margin-left: -30px; }\\n\\n#weight::after {\\n  content: \\\"1\\\";\\n  margin-right: -20px; }\\n\\n#rigidity::before {\\n  content: \\\"5\\\";\\n  margin-left: -20px; }\\n\\n#rigidity::after {\\n  content: \\\"9\\\";\\n  margin-right: -20px; }\\n\\n#delta::before {\\n  content: \\\"0\\\";\\n  margin-left: -20px; }\\n\\n#delta::after {\\n  content: \\\"20\\\";\\n  margin-right: -30px; }\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://springPendulum/./src/styles/input.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

            /***/ }),

        /***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
        /*!***********************************************************************************************************!*\
          !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
          \***********************************************************************************************************/
        /***/ ((module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"html {\\n  color: #525552;\\n  font-size: 28px;\\n  margin: 0;\\n  padding: 0; }\\n\\n#app .wrap {\\n  margin: 32px auto;\\n  padding: calc(16px + 40  * (100vw - 400px)/1920);\\n  width: 800px;\\n  display: grid;\\n  justify-content: center;\\n  grid-template-columns: 1fr 1fr;\\n  grid-gap: calc(8px + 60  * (100vw - 400px)/1920); }\\n  #app .wrap .visual, #app .wrap .options, #app .wrap .characteristic {\\n    border: 2px solid #525552;\\n    border-radius: 3px;\\n    width: 400px;\\n    font-size: 18px; }\\n  #app .wrap .visual {\\n    grid-row: 1/3; }\\n\\n#app svg {\\n  margin: 60px 0 0;\\n  padding: 0; }\\n\\n@media (max-width: 880px) {\\n  #app .wrap {\\n    grid-template-columns: 1fr;\\n    width: 400px; } }\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://springPendulum/./src/styles/main.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

            /***/ }),

        /***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/visual.scss":
        /*!*************************************************************************************************************!*\
          !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/visual.scss ***!
          \*************************************************************************************************************/
        /***/ ((module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".visual button {\\n  outline: none;\\n  width: 90px;\\n  height: 30px;\\n  border-radius: 5px;\\n  cursor: pointer;\\n  font-size: 20px;\\n  text-transform: uppercase;\\n  letter-spacing: 2px;\\n  float: right;\\n  background: grey;\\n  color: aliceblue;\\n  margin-right: 20px; }\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://springPendulum/./src/styles/visual.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

            /***/ }),

        /***/ "./node_modules/css-loader/dist/runtime/api.js":
        /*!*****************************************************!*\
          !*** ./node_modules/css-loader/dist/runtime/api.js ***!
          \*****************************************************/
        /***/ ((module) => {

            eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === \"string\") {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, \"\"]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://springPendulum/./node_modules/css-loader/dist/runtime/api.js?");

            /***/ }),

        /***/ "./src/styles/chatacteristic.scss":
        /*!****************************************!*\
          !*** ./src/styles/chatacteristic.scss ***!
          \****************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatacteristic_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./chatacteristic.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/chatacteristic.scss\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatacteristic_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatacteristic_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack://springPendulum/./src/styles/chatacteristic.scss?");

            /***/ }),

        /***/ "./src/styles/input.scss":
        /*!*******************************!*\
          !*** ./src/styles/input.scss ***!
          \*******************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_input_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./input.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/input.scss\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_input_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_input_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack://springPendulum/./src/styles/input.scss?");

            /***/ }),

        /***/ "./src/styles/main.scss":
        /*!******************************!*\
          !*** ./src/styles/main.scss ***!
          \******************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack://springPendulum/./src/styles/main.scss?");

            /***/ }),

        /***/ "./src/styles/visual.scss":
        /*!********************************!*\
          !*** ./src/styles/visual.scss ***!
          \********************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_visual_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./visual.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/visual.scss\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_visual_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_visual_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack://springPendulum/./src/styles/visual.scss?");

            /***/ }),

        /***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
        /*!****************************************************************************!*\
          !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
          \****************************************************************************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {

            eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://springPendulum/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

            /***/ })

        /******/ 	});
    /************************************************************************/
    /******/ 	// The module cache
    /******/ 	var __webpack_module_cache__ = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
        /******/ 		// Check if module is in cache
        /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
        /******/ 		if (cachedModule !== undefined) {
            /******/ 			return cachedModule.exports;
            /******/ 		}
        /******/ 		// Create a new module (and put it into the cache)
        /******/ 		var module = __webpack_module_cache__[moduleId] = {
            /******/ 			id: moduleId,
            /******/ 			// no module.loaded needed
            /******/ 			exports: {}
            /******/ 		};
        /******/
        /******/ 		// Execute the module function
        /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Return the exports of the module
        /******/ 		return module.exports;
        /******/ 	}
    /******/
    /************************************************************************/
    /******/ 	/* webpack/runtime/compat get default export */
    /******/ 	(() => {
        /******/ 		// getDefaultExport function for compatibility with non-harmony modules
        /******/ 		__webpack_require__.n = (module) => {
            /******/ 			var getter = module && module.__esModule ?
                /******/ 				() => (module['default']) :
                /******/ 				() => (module);
            /******/ 			__webpack_require__.d(getter, { a: getter });
            /******/ 			return getter;
            /******/ 		};
        /******/ 	})();
    /******/
    /******/ 	/* webpack/runtime/define property getters */
    /******/ 	(() => {
        /******/ 		// define getter functions for harmony exports
        /******/ 		__webpack_require__.d = (exports, definition) => {
            /******/ 			for(var key in definition) {
                /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                    /******/ 				}
                /******/ 			}
            /******/ 		};
        /******/ 	})();
    /******/
    /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
    /******/ 	(() => {
        /******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
        /******/ 	})();
    /******/
    /******/ 	/* webpack/runtime/make namespace object */
    /******/ 	(() => {
        /******/ 		// define __esModule on exports
        /******/ 		__webpack_require__.r = (exports) => {
            /******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                /******/ 			}
            /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
            /******/ 		};
        /******/ 	})();
    /******/
    /************************************************************************/
    /******/
    /******/ 	// startup
    /******/ 	// Load entry module and return exports
    /******/ 	// This entry module can't be inlined because the eval devtool is used.
    /******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
    /******/
    /******/ })()
;