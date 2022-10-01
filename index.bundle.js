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

/***/ "./src/custom_middleware/assertDirectoryThenFile.ts":
/*!**********************************************************!*\
  !*** ./src/custom_middleware/assertDirectoryThenFile.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"assertDirectoryThenFile\": () => (/* binding */ assertDirectoryThenFile)\n/* harmony export */ });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction assertDirectoryThenFile(req, res, next) {\n    if (req.params[\"directory_or_file\"] && !req.params[\"file\"]) {\n        if (req.params[\"directory_or_file\"].split('.').length >= 2) {\n            res.sendFile(path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, \"sites\", req.params[\"name\"], req.params[\"directory_or_file\"]));\n            return;\n        }\n        else {\n            if (req.body[\"should_browser_route\"]) {\n                res.sendFile(path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, \"sites\", req.params[\"name\"], \"index.html\"));\n                return;\n            }\n            else {\n                res.status(403).sendFile(path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, \"sites\", \"default\", \"forbidden.html\"));\n                return;\n            }\n        }\n    }\n    next();\n}\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/assertDirectoryThenFile.ts?");

/***/ }),

/***/ "./src/custom_middleware/assertRoute.ts":
/*!**********************************************!*\
  !*** ./src/custom_middleware/assertRoute.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"assertRoute\": () => (/* binding */ assertRoute)\n/* harmony export */ });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction assertRoute(req, res, next) {\n    if (req.params[\"file\"].split(\".\").length >= 2) {\n        next();\n    }\n    else {\n        if (req.body[\"should_browser_route\"]) {\n            res.sendFile(path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, \"sites\", req.params[\"name\"], \"index.html\"));\n            return;\n        }\n        else {\n            res.status(403).sendFile(path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, \"sites\", \"default\", \"forbidden.html\"));\n            return;\n        }\n    }\n}\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/assertRoute.ts?");

/***/ }),

/***/ "./src/custom_middleware/browserRouting.ts":
/*!*************************************************!*\
  !*** ./src/custom_middleware/browserRouting.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"browserRouting\": () => (/* binding */ browserRouting)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction browserRouting(name, routerOption = {}) {\n    const routesAndRedirects = routerOption === undefined ? {} : routerOption;\n    return function (req, res, next) {\n        if (req.params[\"name\"] === name) {\n            req.body[\"should_browser_route\"] = true;\n            if (req.params[\"directory_or_file\"] && !req.params[\"file\"] && `/${req.params[\"directory_or_file\"]}` in routesAndRedirects) {\n                const { redirect, onFail } = routesAndRedirects[`/${req.params[\"directory_or_file\"]}`];\n                if (`/${req.params[\"directory_or_file\"]}` in routesAndRedirects) {\n                    if (onFail) {\n                        if (req.body[\"auth_token\"]) {\n                            try {\n                                const result = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(req.body[\"auth_token\"], process.env.SECRET);\n                                req.body[\"user_id\"] = result[\"id\"];\n                            }\n                            catch (error) {\n                                res.clearCookie(\"auth_token\");\n                                res.redirect(redirect);\n                                return;\n                            }\n                        }\n                        else {\n                            res.redirect(redirect);\n                            return;\n                        }\n                        next();\n                        return;\n                    }\n                    else {\n                        if (req.body[\"auth_token\"]) {\n                            try {\n                                const result = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(req.body[\"auth_token\"], process.env.SECRET);\n                                req.body[\"user_id\"] = result[\"id\"];\n                            }\n                            catch (error) {\n                                res.clearCookie(\"auth_token\");\n                                next();\n                                return;\n                            }\n                        }\n                        else {\n                            next();\n                            return;\n                        }\n                        res.redirect(redirect);\n                        return;\n                    }\n                }\n            }\n            else if (req.params[\"directory_or_file\"] && req.params[\"file\"] && `/${req.params[\"directory_or_file\"]}/${req.params[\"file\"]}` in routesAndRedirects) {\n                const { redirect, onFail } = routesAndRedirects[`/${req.params[\"directory_or_file\"]}/${req.params[\"file\"]}`];\n                if (`/${req.params[\"directory_or_file\"]}/${req.params[\"file\"]}` in routesAndRedirects) {\n                    if (onFail) {\n                        if (req.body[\"auth_token\"]) {\n                            try {\n                                const result = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(req.body[\"auth_token\"], process.env.SECRET);\n                                req.body[\"user_id\"] = result[\"id\"];\n                            }\n                            catch (error) {\n                                res.clearCookie(\"auth_token\");\n                                res.redirect(redirect);\n                                return;\n                            }\n                        }\n                        else {\n                            res.redirect(redirect);\n                            return;\n                        }\n                        next();\n                        return;\n                    }\n                    else {\n                        if (req.body[\"auth_token\"]) {\n                            try {\n                                const result = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(req.body[\"auth_token\"], process.env.SECRET);\n                                req.body[\"user_id\"] = result[\"id\"];\n                            }\n                            catch (error) {\n                                res.clearCookie(\"auth_token\");\n                                next();\n                                return;\n                            }\n                        }\n                        else {\n                            next();\n                            return;\n                        }\n                        res.redirect(redirect);\n                        return;\n                    }\n                }\n            }\n        }\n        next();\n    };\n}\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/browserRouting.ts?");

/***/ }),

/***/ "./src/custom_middleware/groups/ifNameOnly.ts":
/*!****************************************************!*\
  !*** ./src/custom_middleware/groups/ifNameOnly.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ifNameOnly\": () => (/* binding */ ifNameOnly)\n/* harmony export */ });\n/* harmony import */ var _assertDirectoryThenFile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assertDirectoryThenFile */ \"./src/custom_middleware/assertDirectoryThenFile.ts\");\n/* harmony import */ var _assertRoute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assertRoute */ \"./src/custom_middleware/assertRoute.ts\");\n/* harmony import */ var _nameOnlyRedirect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../nameOnlyRedirect */ \"./src/custom_middleware/nameOnlyRedirect.ts\");\n\n\n\nconst ifNameOnly = [_nameOnlyRedirect__WEBPACK_IMPORTED_MODULE_2__.nameOnlyRedirect, _assertDirectoryThenFile__WEBPACK_IMPORTED_MODULE_0__.assertDirectoryThenFile, _assertRoute__WEBPACK_IMPORTED_MODULE_1__.assertRoute];\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/groups/ifNameOnly.ts?");

/***/ }),

/***/ "./src/custom_middleware/lockName.ts":
/*!*******************************************!*\
  !*** ./src/custom_middleware/lockName.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"lockName\": () => (/* binding */ lockName)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction lockName(name, location, options = {}) {\n    const urlEncoded = options.alertMessage === undefined ? \"\" : `?alertmsg=${encodeURIComponent(options.alertMessage)}`;\n    const redirectLocation = location + urlEncoded;\n    return function (req, res, next) {\n        if (req.params[\"name\"] === name) {\n            if (req.body[\"auth_token\"]) {\n                try {\n                    const result = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(req.body[\"auth_token\"], process.env.SECRET);\n                    req.body[\"user_id\"] = result[\"id\"];\n                }\n                catch (error) {\n                    res.clearCookie(\"auth_token\");\n                    res.redirect(redirectLocation);\n                    return;\n                }\n                next();\n                return;\n            }\n            else {\n                res.redirect(redirectLocation);\n                return;\n            }\n        }\n        next();\n    };\n}\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/lockName.ts?");

/***/ }),

/***/ "./src/custom_middleware/lockNameReversed.ts":
/*!***************************************************!*\
  !*** ./src/custom_middleware/lockNameReversed.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"lockNameReversed\": () => (/* binding */ lockNameReversed)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction lockNameReversed(name, location, options = {}) {\n    const urlEncoded = options.alertMessage === undefined ? \"\" : `?alertmsg=${encodeURIComponent(options.alertMessage)}`;\n    const redirectLocation = location + urlEncoded;\n    return function (req, res, next) {\n        if (req.params[\"name\"] === name) {\n            if (req.body[\"auth_token\"]) {\n                try {\n                    const result = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(req.body[\"auth_token\"], process.env.SECRET);\n                    req.body[\"user_id\"] = result[\"id\"];\n                }\n                catch (error) {\n                    res.clearCookie(\"auth_token\");\n                    next();\n                    return;\n                }\n                res.redirect(redirectLocation);\n                return;\n            }\n            else {\n                next();\n                return;\n            }\n        }\n        next();\n    };\n}\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/lockNameReversed.ts?");

/***/ }),

/***/ "./src/custom_middleware/nameOnlyRedirect.ts":
/*!***************************************************!*\
  !*** ./src/custom_middleware/nameOnlyRedirect.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"nameOnlyRedirect\": () => (/* binding */ nameOnlyRedirect)\n/* harmony export */ });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction nameOnlyRedirect(req, res, next) {\n    if (!req.params[\"directory_or_file\"] && !req.params[\"file\"]) {\n        res.sendFile(path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, \"sites\", req.params[\"name\"], \"index.html\"));\n        return;\n    }\n    next();\n}\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/nameOnlyRedirect.ts?");

/***/ }),

/***/ "./src/custom_middleware/parseAuth.ts":
/*!********************************************!*\
  !*** ./src/custom_middleware/parseAuth.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"parseAuth\": () => (/* binding */ parseAuth)\n/* harmony export */ });\nfunction parseAuth(req, res, next) {\n    if (req.header(\"Cookie\")) {\n        const [name, value] = req.header(\"Cookie\").split(\"=\");\n        if (name === \"auth_token\") {\n            req.body[\"auth_token\"] = value;\n        }\n    }\n    next();\n}\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/parseAuth.ts?");

/***/ }),

/***/ "./src/custom_middleware/statusIfNotVerified.ts":
/*!******************************************************!*\
  !*** ./src/custom_middleware/statusIfNotVerified.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"statusIfNotVerified\": () => (/* binding */ statusIfNotVerified)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction statusIfNotVerified(status, message = \"\") {\n    return function (req, res, next) {\n        if (req.body[\"auth_token\"]) {\n            try {\n                const result = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(req.body[\"auth_token\"], process.env.SECRET);\n                req.body[\"user_id\"] = result[\"id\"];\n            }\n            catch (error) {\n                res.clearCookie(\"auth_token\");\n                res.status(status).send(message).end();\n                return;\n            }\n        }\n        else {\n            res.status(status).send(message).end();\n            return;\n        }\n        next();\n    };\n}\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/statusIfNotVerified.ts?");

/***/ }),

/***/ "./src/custom_middleware/validateLogin.ts":
/*!************************************************!*\
  !*** ./src/custom_middleware/validateLogin.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"validateLogin\": () => (/* binding */ validateLogin)\n/* harmony export */ });\nfunction validateLogin(req, res, next) {\n    if (req.body[\"password\"] === '' || req.body[\"email\"] === '') {\n        res.status(400).end();\n        return;\n    }\n    next();\n}\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/validateLogin.ts?");

/***/ }),

/***/ "./src/custom_middleware/validateSignup.ts":
/*!*************************************************!*\
  !*** ./src/custom_middleware/validateSignup.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"validateSignup\": () => (/* binding */ validateSignup)\n/* harmony export */ });\nfunction validateSignup(req, res, next) {\n    if (req.body[\"username\"] === '' || req.body[\"password\"] === '' || req.body[\"email\"] === '') {\n        res.status(400).end();\n        return;\n    }\n    next();\n}\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/validateSignup.ts?");

/***/ }),

/***/ "./src/entity/Food.ts":
/*!****************************!*\
  !*** ./src/entity/Food.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Food\": () => (/* binding */ Food)\n/* harmony export */ });\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typeorm */ \"typeorm\");\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_1__);\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\n\n\nlet Food = class Food extends typeorm__WEBPACK_IMPORTED_MODULE_0__.BaseEntity {\n};\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)(() => type_graphql__WEBPACK_IMPORTED_MODULE_1__.ID),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.PrimaryGeneratedColumn)(\"uuid\", { name: \"id\" }),\n    __metadata(\"design:type\", String)\n], Food.prototype, \"userID\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)(),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)('text'),\n    __metadata(\"design:type\", String)\n], Food.prototype, \"name\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)(),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)({ name: \"img_link\" }),\n    __metadata(\"design:type\", String)\n], Food.prototype, \"imageLink\", void 0);\nFood = __decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.ObjectType)(),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Entity)({ name: \"menu\" })\n], Food);\n\n\n\n//# sourceURL=webpack://server-backend/./src/entity/Food.ts?");

/***/ }),

/***/ "./src/entity/User.ts":
/*!****************************!*\
  !*** ./src/entity/User.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"User\": () => (/* binding */ User)\n/* harmony export */ });\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typeorm */ \"typeorm\");\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_1__);\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\n\n\nlet User = class User extends typeorm__WEBPACK_IMPORTED_MODULE_0__.BaseEntity {\n};\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)(() => type_graphql__WEBPACK_IMPORTED_MODULE_1__.ID),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.PrimaryGeneratedColumn)(\"uuid\", { name: \"user_id\" }),\n    __metadata(\"design:type\", String)\n], User.prototype, \"userID\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)(),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)('text'),\n    __metadata(\"design:type\", String)\n], User.prototype, \"email\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)(),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)('text'),\n    __metadata(\"design:type\", String)\n], User.prototype, \"password\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)(),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)('varchar', {\n        length: 20\n    }),\n    __metadata(\"design:type\", String)\n], User.prototype, \"username\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)(),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)('boolean'),\n    __metadata(\"design:type\", Boolean)\n], User.prototype, \"admin\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)(),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)({ name: \"profile_img_link\" }),\n    __metadata(\"design:type\", String)\n], User.prototype, \"profileImageLink\", void 0);\nUser = __decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.ObjectType)(),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Entity)({ name: \"users\" })\n], User);\n\n\n\n//# sourceURL=webpack://server-backend/./src/entity/User.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express_ws__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-ws */ \"express-ws\");\n/* harmony import */ var express_ws__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_ws__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! apollo-server-express */ \"apollo-server-express\");\n/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _custom_middleware_groups_ifNameOnly__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./custom_middleware/groups/ifNameOnly */ \"./src/custom_middleware/groups/ifNameOnly.ts\");\n/* harmony import */ var _custom_middleware_validateSignup__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./custom_middleware/validateSignup */ \"./src/custom_middleware/validateSignup.ts\");\n/* harmony import */ var _custom_middleware_parseAuth__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./custom_middleware/parseAuth */ \"./src/custom_middleware/parseAuth.ts\");\n/* harmony import */ var _custom_middleware_lockName__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./custom_middleware/lockName */ \"./src/custom_middleware/lockName.ts\");\n/* harmony import */ var _custom_middleware_validateLogin__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./custom_middleware/validateLogin */ \"./src/custom_middleware/validateLogin.ts\");\n/* harmony import */ var _custom_middleware_lockNameReversed__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./custom_middleware/lockNameReversed */ \"./src/custom_middleware/lockNameReversed.ts\");\n/* harmony import */ var _custom_middleware_browserRouting__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./custom_middleware/browserRouting */ \"./src/custom_middleware/browserRouting.ts\");\n/* harmony import */ var _custom_middleware_statusIfNotVerified__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./custom_middleware/statusIfNotVerified */ \"./src/custom_middleware/statusIfNotVerified.ts\");\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! typeorm */ \"typeorm\");\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_18__);\n/* harmony import */ var _entity_User__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./entity/User */ \"./src/entity/User.ts\");\n/* harmony import */ var _entity_Food__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./entity/Food */ \"./src/entity/Food.ts\");\n/* harmony import */ var _resolvers_FoodResolver__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./resolvers/FoodResolver */ \"./src/resolvers/FoodResolver.ts\");\n/* harmony import */ var _resolvers_UserResolver__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./resolvers/UserResolver */ \"./src/resolvers/UserResolver.ts\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ndotenv__WEBPACK_IMPORTED_MODULE_4___default().config({ path: __dirname + \"/.env\" });\nconst appVanilla = express__WEBPACK_IMPORTED_MODULE_1___default()();\nconst expressWs = express_ws__WEBPACK_IMPORTED_MODULE_2___default()(appVanilla);\nconst app = expressWs.app;\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default()[\"static\"](\"static\"));\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default().json());\napp.use(cors__WEBPACK_IMPORTED_MODULE_7___default()());\nawait new typeorm__WEBPACK_IMPORTED_MODULE_18__.DataSource({\n    type: \"postgres\",\n    host: process.env.DB_HOST,\n    port: 5432,\n    username: process.env.DB_USER,\n    password: process.env.DB_PASSWORD,\n    database: process.env.DB_NAME,\n    synchronize: true,\n    entities: [_entity_User__WEBPACK_IMPORTED_MODULE_19__.User, _entity_Food__WEBPACK_IMPORTED_MODULE_20__.Food],\n    subscribers: [],\n    migrations: []\n}).initialize();\nconst schema = await (0,type_graphql__WEBPACK_IMPORTED_MODULE_9__.buildSchema)({\n    resolvers: [_resolvers_FoodResolver__WEBPACK_IMPORTED_MODULE_21__.FoodResolver, _resolvers_UserResolver__WEBPACK_IMPORTED_MODULE_22__.UserResolver]\n});\napp.use(_custom_middleware_parseAuth__WEBPACK_IMPORTED_MODULE_12__.parseAuth);\napp.post('/signup', _custom_middleware_validateSignup__WEBPACK_IMPORTED_MODULE_11__.validateSignup, async (req, res) => {\n    const user = new _entity_User__WEBPACK_IMPORTED_MODULE_19__.User();\n    user.password = await bcrypt__WEBPACK_IMPORTED_MODULE_5___default().hash(req.body[\"password\"], await bcrypt__WEBPACK_IMPORTED_MODULE_5___default().genSalt(10));\n    user.username = req.body[\"username\"];\n    user.email = req.body[\"email\"];\n    user.admin = false;\n    user.profileImageLink = req.body[\"profile_img_link\"] ? req.body[\"profile_img_link\"] : \"\";\n    const duplicateEmail = await _entity_User__WEBPACK_IMPORTED_MODULE_19__.User.findOne({\n        where: {\n            email: user.email\n        }\n    });\n    const duplicateUsername = await _entity_User__WEBPACK_IMPORTED_MODULE_19__.User.findOne({\n        where: {\n            username: user.username\n        }\n    });\n    if (duplicateEmail) {\n        res.status(401).send(\"User With That Email Already Exists\").end();\n        return;\n    }\n    else if (duplicateUsername) {\n        res.status(401).send(\"User With That Username Already Exists\").end();\n        return;\n    }\n    try {\n        await user.save();\n    }\n    catch (_a) {\n        res.status(500).end();\n        return;\n    }\n    res.status(200).end();\n});\napp.post('/login', _custom_middleware_validateLogin__WEBPACK_IMPORTED_MODULE_14__.validateLogin, async (req, res) => {\n    const user = await _entity_User__WEBPACK_IMPORTED_MODULE_19__.User.findOne({\n        where: {\n            email: req.body[\"email\"]\n        }\n    });\n    if (!user) {\n        res.status(401).send(\"Wrong email or password\").end();\n        return;\n    }\n    if (await bcrypt__WEBPACK_IMPORTED_MODULE_5___default().compare(req.body[\"password\"], user.password)) {\n        const authToken = jsonwebtoken__WEBPACK_IMPORTED_MODULE_6___default().sign({\n            id: user.userID,\n        }, process.env.SECRET, {\n            expiresIn: 3600\n        });\n        res.setHeader(\"Set-Cookie\", `auth_token=${authToken}`);\n        res.status(200).send(\"Login successful\").end();\n    }\n    else {\n        res.status(401).send(\"Wrong email or password\").end();\n    }\n});\napp.post('/create-item', async (req, res) => {\n    try {\n        const food = new _entity_Food__WEBPACK_IMPORTED_MODULE_20__.Food();\n        food.name = req.body[\"name\"];\n        food.imageLink = \"\";\n        await food.save();\n    }\n    catch (error) {\n        res.status(400).send(error.toString()).end();\n    }\n    res.status(200).end();\n});\napp.post('/clear-all', (_, res) => {\n    res.clearCookie(\"auth_token\");\n    res.end();\n});\napp.get('/fetch', (0,_custom_middleware_statusIfNotVerified__WEBPACK_IMPORTED_MODULE_17__.statusIfNotVerified)(403), async (req, res) => {\n    const result = await _entity_Food__WEBPACK_IMPORTED_MODULE_20__.Food.find();\n    res.json({ data: result });\n});\napp.ws('/websocket/', (ws, req) => {\n    ws.on('message', data => {\n        ws.send(`Hello There, From Server. Your Message Was: ${data.toString()}, And Your IP Is: ${req.headers[\"x-real-ip\"]}`);\n    });\n});\napp.get('/', (req, res) => res.sendFile(path__WEBPACK_IMPORTED_MODULE_3___default().join(__dirname, \"sites\", \"index\", \"index.html\")));\napp.get('/:name/:directory_or_file?/:file?', (0,_custom_middleware_lockName__WEBPACK_IMPORTED_MODULE_13__.lockName)(\"register-item\", \"/login\", { alertMessage: \"You are logged out\" }), (0,_custom_middleware_lockNameReversed__WEBPACK_IMPORTED_MODULE_15__.lockNameReversed)(\"login\", \"/register-item\", { alertMessage: \"You are already logged in\" }), (0,_custom_middleware_lockNameReversed__WEBPACK_IMPORTED_MODULE_15__.lockNameReversed)(\"signup\", \"/register-item\", { alertMessage: \"Must logout first\" }), (0,_custom_middleware_browserRouting__WEBPACK_IMPORTED_MODULE_16__.browserRouting)(\"cookie-bite\", {\n    \"/login\": {\n        redirect: \"/cookie-bite/\",\n        onFail: false\n    },\n    \"/signup\": {\n        redirect: \"/cookie-bite/\",\n        onFail: false\n    }\n}), ..._custom_middleware_groups_ifNameOnly__WEBPACK_IMPORTED_MODULE_10__.ifNameOnly, (req, res) => {\n    res.sendFile(path__WEBPACK_IMPORTED_MODULE_3___default().join(__dirname, \"sites\", req.url));\n});\nconst server = new apollo_server_express__WEBPACK_IMPORTED_MODULE_8__.ApolloServer({\n    schema,\n    context: ({ req }) => ({\n        req,\n    })\n});\nawait server.start();\nserver.applyMiddleware({ app, path: '/api' });\napp.listen({ port: 5500 }, () => {\n    console.log(\"Server is listening of port 5500\");\n});\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://server-backend/./src/index.ts?");

/***/ }),

/***/ "./src/resolvers/FoodResolver.ts":
/*!***************************************!*\
  !*** ./src/resolvers/FoodResolver.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FoodResolver\": () => (/* binding */ FoodResolver)\n/* harmony export */ });\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _entity_Food__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entity/Food */ \"./src/entity/Food.ts\");\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\n\n\nlet FoodResolver = class FoodResolver {\n    async fetchAll() {\n        return await _entity_Food__WEBPACK_IMPORTED_MODULE_1__.Food.find();\n    }\n};\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Query)(returns => [_entity_Food__WEBPACK_IMPORTED_MODULE_1__.Food]),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", []),\n    __metadata(\"design:returntype\", Promise)\n], FoodResolver.prototype, \"fetchAll\", null);\nFoodResolver = __decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Resolver)(_entity_Food__WEBPACK_IMPORTED_MODULE_1__.Food)\n], FoodResolver);\n\n\n\n//# sourceURL=webpack://server-backend/./src/resolvers/FoodResolver.ts?");

/***/ }),

/***/ "./src/resolvers/UserResolver.ts":
/*!***************************************!*\
  !*** ./src/resolvers/UserResolver.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UserResolver\": () => (/* binding */ UserResolver)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _entity_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity/User */ \"./src/entity/User.ts\");\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (undefined && undefined.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\n\n\n\nlet UserResolver = class UserResolver {\n    async isAvailableUsername(username) {\n        const user = await _entity_User__WEBPACK_IMPORTED_MODULE_2__.User.findOne({\n            where: {\n                username\n            }\n        });\n        return user ? false : true;\n    }\n    async isAvailableEmail(email) {\n        const user = await _entity_User__WEBPACK_IMPORTED_MODULE_2__.User.findOne({\n            where: {\n                email\n            }\n        });\n        return user ? false : true;\n    }\n    async getUserData(context) {\n        const { req } = context;\n        if (req.body[\"auth_token\"]) {\n            try {\n                jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(req.body[\"auth_token\"], process.env.SECRET);\n            }\n            catch (error) {\n                return null;\n            }\n        }\n        else {\n            return null;\n        }\n        const decodedPayload = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().decode(req.body[\"auth_token\"]);\n        return await _entity_User__WEBPACK_IMPORTED_MODULE_2__.User.findOne({\n            where: {\n                userID: decodedPayload[\"id\"]\n            }\n        });\n    }\n};\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Query)(returns => Boolean),\n    __param(0, (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Arg)(\"username\")),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [String]),\n    __metadata(\"design:returntype\", Promise)\n], UserResolver.prototype, \"isAvailableUsername\", null);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Query)(returns => Boolean),\n    __param(0, (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Arg)(\"email\")),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [String]),\n    __metadata(\"design:returntype\", Promise)\n], UserResolver.prototype, \"isAvailableEmail\", null);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Query)(returns => _entity_User__WEBPACK_IMPORTED_MODULE_2__.User, { nullable: true }),\n    __param(0, (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Ctx)()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Object]),\n    __metadata(\"design:returntype\", Promise)\n], UserResolver.prototype, \"getUserData\", null);\nUserResolver = __decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Resolver)(_entity_User__WEBPACK_IMPORTED_MODULE_2__.User)\n], UserResolver);\n\n\n\n//# sourceURL=webpack://server-backend/./src/resolvers/UserResolver.ts?");

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-ws":
/*!*****************************!*\
  !*** external "express-ws" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("express-ws");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "type-graphql":
/*!*******************************!*\
  !*** external "type-graphql" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("type-graphql");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

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
/******/ 			// no module.id needed
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
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;