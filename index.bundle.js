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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"assertDirectoryThenFile\": () => (/* binding */ assertDirectoryThenFile)\n/* harmony export */ });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction assertDirectoryThenFile(req, res, next) {\n    if (req.params[\"directory_or_file\"] && !req.params[\"file\"]) {\n        if (req.params[\"directory_or_file\"].split('.').length >= 2) {\n            res.sendFile(path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, \"sites\", req.params[\"name\"], req.params[\"directory_or_file\"]));\n            return;\n        }\n        else {\n            if (req.body[\"should_browser_route\"]) {\n                res.sendFile(path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, \"sites\", req.params[\"name\"], \"index.html\"));\n                return;\n            }\n            else if (req.body[\"should_static_route\"]) {\n                res.sendFile(path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, \"sites\", req.params[\"name\"], req.params[\"directory_or_file\"], \"index.html\"));\n                return;\n            }\n            else {\n                res.status(403).sendFile(path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, \"sites\", \"default\", \"forbidden.html\"));\n                return;\n            }\n        }\n    }\n    next();\n}\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/assertDirectoryThenFile.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"browserRouting\": () => (/* binding */ browserRouting)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction browserRouting(name, routerOption = {}) {\n    const routesAndRedirects = routerOption === undefined ? {} : routerOption;\n    return function (req, res, next) {\n        if (req.params[\"name\"] !== name) {\n            next();\n            return;\n        }\n        if (req.params[\"directory_or_file\"] && !req.params[\"file\"] && `/${req.params[\"directory_or_file\"]}` in routesAndRedirects) {\n            const { redirect, onFail, adminOnly } = routesAndRedirects[`/${req.params[\"directory_or_file\"]}`];\n            if (!(`/${req.params[\"directory_or_file\"]}` in routesAndRedirects)) {\n                next();\n                return;\n            }\n            if (!onFail) {\n                if (!req.body[\"auth_token\"]) {\n                    next();\n                    return;\n                }\n                try {\n                    const result = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(req.body[\"auth_token\"], process.env.SECRET);\n                    req.body[\"user_id\"] = result[\"id\"];\n                }\n                catch (error) {\n                    res.clearCookie(\"auth_token\");\n                    next();\n                    return;\n                }\n                res.redirect(redirect);\n                return;\n            }\n            if (!req.body[\"auth_token\"]) {\n                res.redirect(redirect);\n                return;\n            }\n            try {\n                const result = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(req.body[\"auth_token\"], process.env.SECRET);\n                req.body[\"user_id\"] = result[\"id\"];\n                if (adminOnly && !result[\"admin\"]) {\n                    res.redirect(redirect);\n                    return;\n                }\n            }\n            catch (error) {\n                res.clearCookie(\"auth_token\");\n                res.redirect(redirect);\n                return;\n            }\n            next();\n            return;\n        }\n        else if (req.params[\"directory_or_file\"] && req.params[\"file\"] && `/${req.params[\"directory_or_file\"]}/${req.params[\"file\"]}` in routesAndRedirects) {\n            const { redirect, onFail, adminOnly } = routesAndRedirects[`/${req.params[\"directory_or_file\"]}/${req.params[\"file\"]}`];\n            if (!(`/${req.params[\"directory_or_file\"]}/${req.params[\"file\"]}` in routesAndRedirects)) {\n                next();\n                return;\n            }\n            if (!onFail) {\n                if (!req.body[\"auth_token\"]) {\n                    next();\n                    return;\n                }\n                try {\n                    const result = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(req.body[\"auth_token\"], process.env.SECRET);\n                    req.body[\"user_id\"] = result[\"id\"];\n                }\n                catch (error) {\n                    res.clearCookie(\"auth_token\");\n                    next();\n                    return;\n                }\n                res.redirect(redirect);\n                return;\n            }\n            if (!req.body[\"auth_token\"]) {\n                res.redirect(redirect);\n                return;\n            }\n            try {\n                const result = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(req.body[\"auth_token\"], process.env.SECRET);\n                req.body[\"user_id\"] = result[\"id\"];\n                if (adminOnly && !result[\"admin\"]) {\n                    res.redirect(redirect);\n                    return;\n                }\n            }\n            catch (error) {\n                res.clearCookie(\"auth_token\");\n                res.redirect(redirect);\n                return;\n            }\n            next();\n            return;\n        }\n        next();\n    };\n}\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/browserRouting.ts?");

/***/ }),

/***/ "./src/custom_middleware/groups/auth.ts":
/*!**********************************************!*\
  !*** ./src/custom_middleware/groups/auth.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"login\": () => (/* binding */ login),\n/* harmony export */   \"signup\": () => (/* binding */ signup)\n/* harmony export */ });\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _entity_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../entity/User */ \"./src/entity/User.ts\");\n/* harmony import */ var _validateLogin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../validateLogin */ \"./src/custom_middleware/validateLogin.ts\");\n/* harmony import */ var _validateSignup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../validateSignup */ \"./src/custom_middleware/validateSignup.ts\");\n\n\n\n\n\nconst signup = [_validateSignup__WEBPACK_IMPORTED_MODULE_4__.validateSignup, async (req, res) => {\n        const user = new _entity_User__WEBPACK_IMPORTED_MODULE_2__.User();\n        user.password = await bcrypt__WEBPACK_IMPORTED_MODULE_0___default().hash(req.body[\"password\"], await bcrypt__WEBPACK_IMPORTED_MODULE_0___default().genSalt(10));\n        user.username = req.body[\"username\"];\n        user.email = req.body[\"email\"];\n        user.admin = false;\n        user.profileImageLink = req.body[\"profile_img_link\"] ? req.body[\"profile_img_link\"] : \"\";\n        const duplicateEmail = await _entity_User__WEBPACK_IMPORTED_MODULE_2__.User.findOne({\n            where: {\n                email: user.email\n            }\n        });\n        const duplicateUsername = await _entity_User__WEBPACK_IMPORTED_MODULE_2__.User.findOne({\n            where: {\n                username: user.username\n            }\n        });\n        if (duplicateEmail) {\n            res.status(401).send(\"User With That Email Already Exists\").end();\n            return;\n        }\n        else if (duplicateUsername) {\n            res.status(401).send(\"User With That Username Already Exists\").end();\n            return;\n        }\n        try {\n            await user.save();\n        }\n        catch (_a) {\n            res.status(500).end();\n            return;\n        }\n        res.status(200).end();\n    }];\nconst login = [_validateLogin__WEBPACK_IMPORTED_MODULE_3__.validateLogin, async (req, res) => {\n        const user = await _entity_User__WEBPACK_IMPORTED_MODULE_2__.User.findOne({\n            where: {\n                email: req.body[\"email\"]\n            }\n        });\n        if (!user) {\n            res.status(401).send(\"Wrong email or password\").end();\n            return;\n        }\n        if (await bcrypt__WEBPACK_IMPORTED_MODULE_0___default().compare(req.body[\"password\"], user.password)) {\n            const authToken = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign({\n                id: user.userID,\n                admin: user.admin\n            }, process.env.SECRET, {\n                expiresIn: 3600\n            });\n            res.setHeader(\"Set-Cookie\", `auth_token=${authToken}`);\n            res.status(200).send(\"Login successful\").end();\n        }\n        else {\n            res.status(401).send(\"Wrong email or password\").end();\n        }\n    }];\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/groups/auth.ts?");

/***/ }),

/***/ "./src/custom_middleware/groups/ifNameOnly.ts":
/*!****************************************************!*\
  !*** ./src/custom_middleware/groups/ifNameOnly.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ifNameOnly\": () => (/* binding */ ifNameOnly)\n/* harmony export */ });\n/* harmony import */ var _assertDirectoryThenFile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assertDirectoryThenFile */ \"./src/custom_middleware/assertDirectoryThenFile.ts\");\n/* harmony import */ var _assertRoute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assertRoute */ \"./src/custom_middleware/assertRoute.ts\");\n/* harmony import */ var _nameOnlyRedirect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../nameOnlyRedirect */ \"./src/custom_middleware/nameOnlyRedirect.ts\");\n\n\n\nconst ifNameOnly = [_nameOnlyRedirect__WEBPACK_IMPORTED_MODULE_2__.nameOnlyRedirect, _assertDirectoryThenFile__WEBPACK_IMPORTED_MODULE_0__.assertDirectoryThenFile, _assertRoute__WEBPACK_IMPORTED_MODULE_1__.assertRoute];\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/groups/ifNameOnly.ts?");

/***/ }),

/***/ "./src/custom_middleware/groups/routingConfig.ts":
/*!*******************************************************!*\
  !*** ./src/custom_middleware/groups/routingConfig.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"routingConfig\": () => (/* binding */ routingConfig)\n/* harmony export */ });\n/* harmony import */ var _browserRouting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../browserRouting */ \"./src/custom_middleware/browserRouting.ts\");\n/* harmony import */ var _staticRouting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../staticRouting */ \"./src/custom_middleware/staticRouting.ts\");\n\n\nconst routingConfig = [\n    (0,_browserRouting__WEBPACK_IMPORTED_MODULE_0__.browserRouting)(\"cookie-bite\", {\n        \"/login\": {\n            redirect: \"/cookie-bite/\",\n            onFail: false,\n            adminOnly: false\n        },\n        \"/signup\": {\n            redirect: \"/cookie-bite/\",\n            onFail: false,\n            adminOnly: false\n        },\n        \"/manage-menu-items\": {\n            redirect: \"/cookie-bite/\",\n            onFail: true,\n            adminOnly: true\n        }\n    }),\n    (0,_staticRouting__WEBPACK_IMPORTED_MODULE_1__.staticRouting)(\"qwik-test\"),\n];\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/groups/routingConfig.ts?");

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

/***/ "./src/custom_middleware/staticRouting.ts":
/*!************************************************!*\
  !*** ./src/custom_middleware/staticRouting.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"staticRouting\": () => (/* binding */ staticRouting)\n/* harmony export */ });\nfunction staticRouting(name) {\n    return function (req, res, next) {\n        if (req.params[\"name\"] !== name) {\n            next();\n            return;\n        }\n        req.body[\"should_static_route\"] = true;\n        next();\n    };\n}\n\n\n//# sourceURL=webpack://server-backend/./src/custom_middleware/staticRouting.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Food\": () => (/* binding */ Food)\n/* harmony export */ });\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typeorm */ \"typeorm\");\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _FoodVariants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FoodVariants */ \"./src/entity/FoodVariants.ts\");\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\n\n\n\nlet Food = class Food extends typeorm__WEBPACK_IMPORTED_MODULE_0__.BaseEntity {\n};\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)(() => type_graphql__WEBPACK_IMPORTED_MODULE_1__.ID, { name: 'itemID' }),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.PrimaryGeneratedColumn)(\"uuid\", { name: \"id\" }),\n    __metadata(\"design:type\", String)\n], Food.prototype, \"itemID\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)({ name: 'name' }),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)('text', { name: 'name' }),\n    __metadata(\"design:type\", String)\n], Food.prototype, \"name\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)({ name: 'imageLink' }),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)({ name: 'img_link' }),\n    __metadata(\"design:type\", String)\n], Food.prototype, \"imageLink\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)({ name: 'category' }),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)({ length: 1, name: 'category' }),\n    __metadata(\"design:type\", String)\n], Food.prototype, \"category\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)(type => [_FoodVariants__WEBPACK_IMPORTED_MODULE_2__.FoodVariants], { name: 'variants' }),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.OneToMany)(() => _FoodVariants__WEBPACK_IMPORTED_MODULE_2__.FoodVariants, (foodVariant) => foodVariant.foodID),\n    __metadata(\"design:type\", Array)\n], Food.prototype, \"variants\", void 0);\nFood = __decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.ObjectType)(),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Entity)({ name: \"items\" })\n], Food);\n\n\n\n//# sourceURL=webpack://server-backend/./src/entity/Food.ts?");

/***/ }),

/***/ "./src/entity/FoodVariants.ts":
/*!************************************!*\
  !*** ./src/entity/FoodVariants.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FoodVariants\": () => (/* binding */ FoodVariants)\n/* harmony export */ });\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typeorm */ \"typeorm\");\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Food__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Food */ \"./src/entity/Food.ts\");\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\n\n\n\nlet FoodVariants = class FoodVariants extends typeorm__WEBPACK_IMPORTED_MODULE_0__.BaseEntity {\n};\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)(() => _Food__WEBPACK_IMPORTED_MODULE_2__.Food, { name: 'foodID' }),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.ManyToOne)(() => _Food__WEBPACK_IMPORTED_MODULE_2__.Food, (food) => food.variants),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.JoinColumn)({ name: 'item_id' }),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.PrimaryColumn)({ name: 'item_id', type: 'uuid' }),\n    __metadata(\"design:type\", Object)\n], FoodVariants.prototype, \"foodID\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)({ name: 'variantName' }),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.PrimaryColumn)({ name: 'variant_name' }),\n    __metadata(\"design:type\", String)\n], FoodVariants.prototype, \"variantName\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)({ name: 'price' }),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)({ name: 'price' }),\n    __metadata(\"design:type\", Number)\n], FoodVariants.prototype, \"price\", void 0);\nFoodVariants = __decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.ObjectType)(),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Entity)({ name: \"item_variants\" })\n], FoodVariants);\n\n\n\n//# sourceURL=webpack://server-backend/./src/entity/FoodVariants.ts?");

/***/ }),

/***/ "./src/entity/User.ts":
/*!****************************!*\
  !*** ./src/entity/User.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"User\": () => (/* binding */ User)\n/* harmony export */ });\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typeorm */ \"typeorm\");\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_1__);\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\n\n\nlet User = class User extends typeorm__WEBPACK_IMPORTED_MODULE_0__.BaseEntity {\n};\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)(() => type_graphql__WEBPACK_IMPORTED_MODULE_1__.ID, { name: 'userID' }),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.PrimaryGeneratedColumn)(\"uuid\", { name: \"user_id\" }),\n    __metadata(\"design:type\", String)\n], User.prototype, \"userID\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)({ name: 'email' }),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)('text', { name: 'email' }),\n    __metadata(\"design:type\", String)\n], User.prototype, \"email\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)({ name: 'password' }),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)('text', { name: 'password' }),\n    __metadata(\"design:type\", String)\n], User.prototype, \"password\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)({ name: 'username' }),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)('varchar', {\n        length: 20,\n        name: 'username'\n    }),\n    __metadata(\"design:type\", String)\n], User.prototype, \"username\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)({ name: 'admin' }),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)('boolean', { name: 'admin' }),\n    __metadata(\"design:type\", Boolean)\n], User.prototype, \"admin\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Field)({ name: 'profileImageLink' }),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)({ name: \"profile_img_link\" }),\n    __metadata(\"design:type\", String)\n], User.prototype, \"profileImageLink\", void 0);\nUser = __decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.ObjectType)(),\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Entity)({ name: \"users\" })\n], User);\n\n\n\n//# sourceURL=webpack://server-backend/./src/entity/User.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express_ws__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-ws */ \"express-ws\");\n/* harmony import */ var express_ws__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_ws__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! apollo-server-express */ \"apollo-server-express\");\n/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _custom_middleware_groups_ifNameOnly__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./custom_middleware/groups/ifNameOnly */ \"./src/custom_middleware/groups/ifNameOnly.ts\");\n/* harmony import */ var _custom_middleware_parseAuth__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./custom_middleware/parseAuth */ \"./src/custom_middleware/parseAuth.ts\");\n/* harmony import */ var _custom_middleware_statusIfNotVerified__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./custom_middleware/statusIfNotVerified */ \"./src/custom_middleware/statusIfNotVerified.ts\");\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! typeorm */ \"typeorm\");\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _entity_User__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./entity/User */ \"./src/entity/User.ts\");\n/* harmony import */ var _entity_Food__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./entity/Food */ \"./src/entity/Food.ts\");\n/* harmony import */ var _resolvers_FoodResolver__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./resolvers/FoodResolver */ \"./src/resolvers/FoodResolver.ts\");\n/* harmony import */ var _resolvers_UserResolver__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./resolvers/UserResolver */ \"./src/resolvers/UserResolver.ts\");\n/* harmony import */ var _entity_FoodVariants__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./entity/FoodVariants */ \"./src/entity/FoodVariants.ts\");\n/* harmony import */ var _resolvers_FoodVariantsResolver__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./resolvers/FoodVariantsResolver */ \"./src/resolvers/FoodVariantsResolver.ts\");\n/* harmony import */ var _custom_middleware_groups_auth__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./custom_middleware/groups/auth */ \"./src/custom_middleware/groups/auth.ts\");\n/* harmony import */ var _custom_middleware_groups_routingConfig__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./custom_middleware/groups/routingConfig */ \"./src/custom_middleware/groups/routingConfig.ts\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ndotenv__WEBPACK_IMPORTED_MODULE_4___default().config({ path: __dirname + \"/.env\" });\nconst appVanilla = express__WEBPACK_IMPORTED_MODULE_1___default()();\nconst expressWs = express_ws__WEBPACK_IMPORTED_MODULE_2___default()(appVanilla);\nconst app = expressWs.app;\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default()[\"static\"](\"static\"));\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default().json());\napp.use(cors__WEBPACK_IMPORTED_MODULE_5___default()());\napp.use(_custom_middleware_parseAuth__WEBPACK_IMPORTED_MODULE_9__.parseAuth);\nawait new typeorm__WEBPACK_IMPORTED_MODULE_11__.DataSource({\n    type: \"postgres\",\n    host: process.env.DB_HOST,\n    port: 5432,\n    username: process.env.DB_USER,\n    password: process.env.DB_PASSWORD,\n    database: process.env.DB_NAME,\n    synchronize: false,\n    entities: [_entity_User__WEBPACK_IMPORTED_MODULE_12__.User, _entity_Food__WEBPACK_IMPORTED_MODULE_13__.Food, _entity_FoodVariants__WEBPACK_IMPORTED_MODULE_16__.FoodVariants],\n    subscribers: []\n}).initialize();\nconst schema = await (0,type_graphql__WEBPACK_IMPORTED_MODULE_7__.buildSchema)({\n    resolvers: [_resolvers_FoodResolver__WEBPACK_IMPORTED_MODULE_14__.FoodResolver, _resolvers_UserResolver__WEBPACK_IMPORTED_MODULE_15__.UserResolver, _resolvers_FoodVariantsResolver__WEBPACK_IMPORTED_MODULE_17__.FoodVariantsResolver]\n});\napp.post('/signup', _custom_middleware_groups_auth__WEBPACK_IMPORTED_MODULE_18__.signup);\napp.post('/login', _custom_middleware_groups_auth__WEBPACK_IMPORTED_MODULE_18__.login);\napp.post('/create-item', async (req, res) => {\n    try {\n        const food = new _entity_Food__WEBPACK_IMPORTED_MODULE_13__.Food();\n        food.name = req.body[\"name\"];\n        food.imageLink = \"\";\n        await food.save();\n    }\n    catch (error) {\n        res.status(400).send(error.toString()).end();\n    }\n    res.status(200).end();\n});\napp.post('/clear-all', (_, res) => {\n    res.clearCookie(\"auth_token\");\n    res.end();\n});\napp.get('/fetch', (0,_custom_middleware_statusIfNotVerified__WEBPACK_IMPORTED_MODULE_10__.statusIfNotVerified)(403), async (req, res) => {\n    const result = await _entity_Food__WEBPACK_IMPORTED_MODULE_13__.Food.find();\n    res.json({ data: result });\n});\napp.ws('/websocket/', (ws, req) => {\n    ws.on('message', data => {\n        ws.send(`Hello There, From Server. Your Message Was: ${data.toString()}, And Your IP Is: ${req.headers[\"x-real-ip\"]}`);\n    });\n});\napp.get('/', (req, res) => res.sendFile(path__WEBPACK_IMPORTED_MODULE_3___default().join(__dirname, \"sites\", \"index\", \"index.html\")));\napp.get('/:name/:directory_or_file?/:file?', ..._custom_middleware_groups_routingConfig__WEBPACK_IMPORTED_MODULE_19__.routingConfig, ..._custom_middleware_groups_ifNameOnly__WEBPACK_IMPORTED_MODULE_8__.ifNameOnly, (req, res) => {\n    res.sendFile(path__WEBPACK_IMPORTED_MODULE_3___default().join(__dirname, \"sites\", req.url));\n});\nconst server = new apollo_server_express__WEBPACK_IMPORTED_MODULE_6__.ApolloServer({\n    schema,\n    context: ({ req, res }) => ({\n        req,\n        res\n    })\n});\nawait server.start();\nserver.applyMiddleware({ app, path: '/api' });\napp.listen({ port: 5500 }, () => {\n    console.log(\"Server is listening of port 5500\");\n});\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://server-backend/./src/index.ts?");

/***/ }),

/***/ "./src/resolvers/FoodResolver.ts":
/*!***************************************!*\
  !*** ./src/resolvers/FoodResolver.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FoodResolver\": () => (/* binding */ FoodResolver)\n/* harmony export */ });\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _entity_Food__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entity/Food */ \"./src/entity/Food.ts\");\n/* harmony import */ var _entity_FoodVariants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity/FoodVariants */ \"./src/entity/FoodVariants.ts\");\n/* harmony import */ var _inputs_composites_deleteFoodsArg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inputs/composites/deleteFoodsArg */ \"./src/resolvers/inputs/composites/deleteFoodsArg.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__);\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (undefined && undefined.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\n\n\n\n\n\nlet FoodResolver = class FoodResolver {\n    async fetchAll() {\n        return await _entity_Food__WEBPACK_IMPORTED_MODULE_1__.Food.find({\n            relations: {\n                variants: true\n            },\n            order: {\n                name: \"ASC\",\n                category: \"ASC\",\n                variants: {\n                    price: \"ASC\"\n                }\n            }\n        });\n    }\n    async deleteFoods(ctx, foods) {\n        const { req } = ctx;\n        if (!process.env.DISABLE_AUTH) {\n            if (req.body[\"auth_token\"]) {\n                try {\n                    jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default().verify(req.body[\"auth_token\"], process.env.SECRET);\n                }\n                catch (error) {\n                    return null;\n                }\n            }\n            else {\n                return null;\n            }\n            const decodedPayload = jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default().decode(req.body[\"auth_token\"]);\n            if (!decodedPayload[\"admin\"]) {\n                return null;\n            }\n        }\n        const { foods: foodsToDelete } = foods;\n        const deleteFoods = await Promise.all(foodsToDelete.map(async (foodInput) => {\n            const food = await _entity_Food__WEBPACK_IMPORTED_MODULE_1__.Food.findOne({\n                where: {\n                    name: foodInput.name,\n                    category: foodInput.category\n                },\n                relations: {\n                    variants: true\n                }\n            });\n            if (food === null) {\n                return 0;\n            }\n            await _entity_FoodVariants__WEBPACK_IMPORTED_MODULE_2__.FoodVariants.remove(food.variants);\n            return food;\n        }));\n        if (deleteFoods.includes(0)) {\n            return null;\n        }\n        return await _entity_Food__WEBPACK_IMPORTED_MODULE_1__.Food.remove(deleteFoods);\n    }\n};\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Query)(returns => [_entity_Food__WEBPACK_IMPORTED_MODULE_1__.Food], { name: 'fetchAll' }),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", []),\n    __metadata(\"design:returntype\", Promise)\n], FoodResolver.prototype, \"fetchAll\", null);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Mutation)(returns => [_entity_Food__WEBPACK_IMPORTED_MODULE_1__.Food], { nullable: true, name: 'deleteFoods' }),\n    __param(0, (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Ctx)()),\n    __param(1, (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Arg)(\"food\")),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Object, _inputs_composites_deleteFoodsArg__WEBPACK_IMPORTED_MODULE_3__.deleteFoods]),\n    __metadata(\"design:returntype\", Promise)\n], FoodResolver.prototype, \"deleteFoods\", null);\nFoodResolver = __decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Resolver)(_entity_Food__WEBPACK_IMPORTED_MODULE_1__.Food)\n], FoodResolver);\n\n\n\n//# sourceURL=webpack://server-backend/./src/resolvers/FoodResolver.ts?");

/***/ }),

/***/ "./src/resolvers/FoodVariantsResolver.ts":
/*!***********************************************!*\
  !*** ./src/resolvers/FoodVariantsResolver.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FoodVariantsResolver\": () => (/* binding */ FoodVariantsResolver)\n/* harmony export */ });\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _entity_Food__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entity/Food */ \"./src/entity/Food.ts\");\n/* harmony import */ var _entity_FoodVariants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity/FoodVariants */ \"./src/entity/FoodVariants.ts\");\n/* harmony import */ var _inputs_composites_registerFoodAndVariants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inputs/composites/registerFoodAndVariants */ \"./src/resolvers/inputs/composites/registerFoodAndVariants.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__);\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (undefined && undefined.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\n\n\n\n\n\nlet FoodVariantsResolver = class FoodVariantsResolver {\n    async registerFoodAndVariants(context, foodAndVariants) {\n        const { req } = context;\n        if (!process.env.DISABLE_AUTH) {\n            if (req.body[\"auth_token\"]) {\n                try {\n                    jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default().verify(req.body[\"auth_token\"], process.env.SECRET);\n                }\n                catch (error) {\n                    return null;\n                }\n            }\n            else {\n                return null;\n            }\n            const decodedPayload = jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default().decode(req.body[\"auth_token\"]);\n            if (!decodedPayload[\"admin\"]) {\n                return null;\n            }\n        }\n        const { food, variants } = foodAndVariants;\n        const { name, imageLink, category } = food;\n        const foodItem = new _entity_Food__WEBPACK_IMPORTED_MODULE_1__.Food();\n        foodItem.name = name;\n        foodItem.imageLink = imageLink;\n        foodItem.category = category;\n        await foodItem.save();\n        return await Promise.all(variants.map(async (variant) => {\n            const { name, price } = variant;\n            const variantItem = new _entity_FoodVariants__WEBPACK_IMPORTED_MODULE_2__.FoodVariants();\n            variantItem.variantName = name;\n            variantItem.price = price;\n            variantItem.foodID = foodItem;\n            return await variantItem.save();\n        }));\n    }\n    async fetchAllVariants() {\n        return await _entity_FoodVariants__WEBPACK_IMPORTED_MODULE_2__.FoodVariants.find({\n            relations: {\n                foodID: true\n            }\n        });\n    }\n};\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Mutation)(returns => [_entity_FoodVariants__WEBPACK_IMPORTED_MODULE_2__.FoodVariants], { nullable: true, name: 'registerFoodAndVariants' }),\n    __param(0, (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Ctx)()),\n    __param(1, (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Arg)('foodAndVariants')),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Object, _inputs_composites_registerFoodAndVariants__WEBPACK_IMPORTED_MODULE_3__.RegisterFoodAndVariants]),\n    __metadata(\"design:returntype\", Promise)\n], FoodVariantsResolver.prototype, \"registerFoodAndVariants\", null);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Query)(returns => [_entity_FoodVariants__WEBPACK_IMPORTED_MODULE_2__.FoodVariants], { name: 'fetchAllVariants' }),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", []),\n    __metadata(\"design:returntype\", Promise)\n], FoodVariantsResolver.prototype, \"fetchAllVariants\", null);\nFoodVariantsResolver = __decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Resolver)(_entity_FoodVariants__WEBPACK_IMPORTED_MODULE_2__.FoodVariants)\n], FoodVariantsResolver);\n\n\n\n//# sourceURL=webpack://server-backend/./src/resolvers/FoodVariantsResolver.ts?");

/***/ }),

/***/ "./src/resolvers/UserResolver.ts":
/*!***************************************!*\
  !*** ./src/resolvers/UserResolver.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UserResolver\": () => (/* binding */ UserResolver)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _entity_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity/User */ \"./src/entity/User.ts\");\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (undefined && undefined.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\n\n\n\nlet UserResolver = class UserResolver {\n    async isAvailableUsername(username) {\n        const user = await _entity_User__WEBPACK_IMPORTED_MODULE_2__.User.findOne({\n            where: {\n                username\n            }\n        });\n        return user ? false : true;\n    }\n    async isAvailableEmail(email) {\n        const user = await _entity_User__WEBPACK_IMPORTED_MODULE_2__.User.findOne({\n            where: {\n                email\n            }\n        });\n        return user ? false : true;\n    }\n    async getUserData(context) {\n        const { req } = context;\n        if (req.body[\"auth_token\"]) {\n            try {\n                jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(req.body[\"auth_token\"], process.env.SECRET);\n            }\n            catch (error) {\n                return null;\n            }\n        }\n        else {\n            return null;\n        }\n        const decodedPayload = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().decode(req.body[\"auth_token\"]);\n        return await _entity_User__WEBPACK_IMPORTED_MODULE_2__.User.findOne({\n            where: {\n                userID: decodedPayload[\"id\"]\n            }\n        });\n    }\n};\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Query)(returns => Boolean, { name: 'isAvailableUsername' }),\n    __param(0, (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Arg)(\"username\")),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [String]),\n    __metadata(\"design:returntype\", Promise)\n], UserResolver.prototype, \"isAvailableUsername\", null);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Query)(returns => Boolean, { name: 'isAvailableEmail' }),\n    __param(0, (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Arg)(\"email\")),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [String]),\n    __metadata(\"design:returntype\", Promise)\n], UserResolver.prototype, \"isAvailableEmail\", null);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Query)(returns => _entity_User__WEBPACK_IMPORTED_MODULE_2__.User, { nullable: true, name: 'getUserData' }),\n    __param(0, (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Ctx)()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Object]),\n    __metadata(\"design:returntype\", Promise)\n], UserResolver.prototype, \"getUserData\", null);\nUserResolver = __decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_1__.Resolver)(_entity_User__WEBPACK_IMPORTED_MODULE_2__.User)\n], UserResolver);\n\n\n\n//# sourceURL=webpack://server-backend/./src/resolvers/UserResolver.ts?");

/***/ }),

/***/ "./src/resolvers/inputs/FoodInput.ts":
/*!*******************************************!*\
  !*** ./src/resolvers/inputs/FoodInput.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FoodInput\": () => (/* binding */ FoodInput)\n/* harmony export */ });\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_0__);\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\n\nlet FoodInput = class FoodInput {\n};\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Field)(type => String, { name: 'name' }),\n    __metadata(\"design:type\", String)\n], FoodInput.prototype, \"name\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Field)(type => String, { name: 'imageLink' }),\n    __metadata(\"design:type\", String)\n], FoodInput.prototype, \"imageLink\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Field)(type => String, { name: 'category' }),\n    __metadata(\"design:type\", String)\n], FoodInput.prototype, \"category\", void 0);\nFoodInput = __decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.InputType)()\n], FoodInput);\n\n\n\n//# sourceURL=webpack://server-backend/./src/resolvers/inputs/FoodInput.ts?");

/***/ }),

/***/ "./src/resolvers/inputs/FoodVariantsInput.ts":
/*!***************************************************!*\
  !*** ./src/resolvers/inputs/FoodVariantsInput.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FoodVariantsInput\": () => (/* binding */ FoodVariantsInput)\n/* harmony export */ });\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_0__);\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\n\nlet FoodVariantsInput = class FoodVariantsInput {\n};\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Field)(type => String, { name: 'name' }),\n    __metadata(\"design:type\", String)\n], FoodVariantsInput.prototype, \"name\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Field)(type => type_graphql__WEBPACK_IMPORTED_MODULE_0__.Float, { name: 'price' }),\n    __metadata(\"design:type\", Number)\n], FoodVariantsInput.prototype, \"price\", void 0);\nFoodVariantsInput = __decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.InputType)()\n], FoodVariantsInput);\n\n\n\n//# sourceURL=webpack://server-backend/./src/resolvers/inputs/FoodVariantsInput.ts?");

/***/ }),

/***/ "./src/resolvers/inputs/composites/deleteFoodsArg.ts":
/*!***********************************************************!*\
  !*** ./src/resolvers/inputs/composites/deleteFoodsArg.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"deleteFoods\": () => (/* binding */ deleteFoods)\n/* harmony export */ });\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _FoodInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FoodInput */ \"./src/resolvers/inputs/FoodInput.ts\");\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\n\n\nlet deleteFoods = class deleteFoods {\n};\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Field)(type => [_FoodInput__WEBPACK_IMPORTED_MODULE_1__.FoodInput], { name: 'foods' }),\n    __metadata(\"design:type\", Array)\n], deleteFoods.prototype, \"foods\", void 0);\ndeleteFoods = __decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.InputType)()\n], deleteFoods);\n\n\n\n//# sourceURL=webpack://server-backend/./src/resolvers/inputs/composites/deleteFoodsArg.ts?");

/***/ }),

/***/ "./src/resolvers/inputs/composites/registerFoodAndVariants.ts":
/*!********************************************************************!*\
  !*** ./src/resolvers/inputs/composites/registerFoodAndVariants.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RegisterFoodAndVariants\": () => (/* binding */ RegisterFoodAndVariants)\n/* harmony export */ });\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _FoodInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FoodInput */ \"./src/resolvers/inputs/FoodInput.ts\");\n/* harmony import */ var _FoodVariantsInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../FoodVariantsInput */ \"./src/resolvers/inputs/FoodVariantsInput.ts\");\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\n\n\n\nlet RegisterFoodAndVariants = class RegisterFoodAndVariants {\n};\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Field)(type => _FoodInput__WEBPACK_IMPORTED_MODULE_1__.FoodInput, { name: 'food' }),\n    __metadata(\"design:type\", _FoodInput__WEBPACK_IMPORTED_MODULE_1__.FoodInput)\n], RegisterFoodAndVariants.prototype, \"food\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.Field)(type => [_FoodVariantsInput__WEBPACK_IMPORTED_MODULE_2__.FoodVariantsInput], { name: 'variants' }),\n    __metadata(\"design:type\", Array)\n], RegisterFoodAndVariants.prototype, \"variants\", void 0);\nRegisterFoodAndVariants = __decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_0__.InputType)()\n], RegisterFoodAndVariants);\n\n\n\n//# sourceURL=webpack://server-backend/./src/resolvers/inputs/composites/registerFoodAndVariants.ts?");

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