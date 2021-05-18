(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! F:\RationalityEnhancement\AIForProductivity\DemoAppBasic\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");


class AppComponent {
    constructor(router) {
        this.router = router;
    }
    ngAfterViewInit() {
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, consts: [["id", "outlet-wrapper"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "YyQK":
/*!*****************************************!*\
  !*** ./src/app/views/init.component.ts ***!
  \*****************************************/
/*! exports provided: InitComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitComponent", function() { return InitComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");


class InitComponent {
    constructor(router) {
        this.router = router;
    }
    route() {
        this.router.navigateByUrl('/login');
    }
}
InitComponent.ɵfac = function InitComponent_Factory(t) { return new (t || InitComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
InitComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: InitComponent, selectors: [["init"]], decls: 12, vars: 0, consts: [[1, "logo-wrapper"], ["src", "./assets/images/logo.png"], [1, "btn", "bottom", 3, "click"]], template: function InitComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "AI Powered To-Do List Gamification Demo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Rationality Enhancement Group");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InitComponent_Template_div_click_10_listener() { return ctx.route(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Get started");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["[_nghost-%COMP%] {\n      text-align:center;\n    }\n\n    .logo-wrapper[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content:center;\n      align-items:center;\n      height: 200px;\n      margin-bottom: 20px;\n    }\n\n    .logo-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n      height: 100%;\n    }"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _views_init_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./views/init.component */ "YyQK");
/* harmony import */ var _views_todo_list_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./views/todo-list.component */ "fnb+");
/* harmony import */ var _views_login_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./views/login.component */ "wj+i");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/slider */ "5RNC");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/autocomplete */ "/1cH");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _provider_item_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./provider/item.service */ "tl+q");
/* harmony import */ var _views_optimized_list_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./views/optimized-list.component */ "n5Wg");
/* harmony import */ var _guards_resolve_guard__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./guards/resolve.guard */ "jLYy");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ "fXoL");




















const routes = [
    { path: 'intro', component: _views_init_component__WEBPACK_IMPORTED_MODULE_7__["InitComponent"] },
    { path: 'list', component: _views_todo_list_component__WEBPACK_IMPORTED_MODULE_8__["ToDoListComponent"] },
    { path: 'login', component: _views_login_component__WEBPACK_IMPORTED_MODULE_9__["LoginComponent"] },
    { path: 'optimized', component: _views_optimized_list_component__WEBPACK_IMPORTED_MODULE_16__["OptimizedListComponent"] },
    { path: '**', redirectTo: '/intro', pathMatch: 'full' },
];
class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [_provider_item_service__WEBPACK_IMPORTED_MODULE_15__["ItemService"], _guards_resolve_guard__WEBPACK_IMPORTED_MODULE_17__["ResolveGuard"]], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forRoot(routes),
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
            _angular_material_slider__WEBPACK_IMPORTED_MODULE_10__["MatSliderModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_12__["MatAutocompleteModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__["MatFormFieldModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_14__["MatInputModule"]
        ], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _views_init_component__WEBPACK_IMPORTED_MODULE_7__["InitComponent"],
        _views_todo_list_component__WEBPACK_IMPORTED_MODULE_8__["ToDoListComponent"],
        _views_login_component__WEBPACK_IMPORTED_MODULE_9__["LoginComponent"],
        _views_optimized_list_component__WEBPACK_IMPORTED_MODULE_16__["OptimizedListComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
        _angular_material_slider__WEBPACK_IMPORTED_MODULE_10__["MatSliderModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_12__["MatAutocompleteModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__["MatFormFieldModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_14__["MatInputModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"]] }); })();


/***/ }),

/***/ "fnb+":
/*!**********************************************!*\
  !*** ./src/app/views/todo-list.component.ts ***!
  \**********************************************/
/*! exports provided: ToDoListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToDoListComponent", function() { return ToDoListComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globals */ "xa+l");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");






function ToDoListComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "form", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "label", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ToDoListComponent_div_3_Template_input_ngModelChange_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r3.task_desc = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "label", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "input", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ToDoListComponent_div_3_Template_input_ngModelChange_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r5.task_time_est = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "input", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ToDoListComponent_div_3_Template_input_ngModelChange_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r6.task_deadline = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "input", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ToDoListComponent_div_3_Template_input_ngModelChange_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r7.task_today = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "label", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, " Not Today ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ToDoListComponent_div_3_Template_input_ngModelChange_14_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r8.task_today = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "label", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, " Today ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ToDoListComponent_div_3_Template_button_click_17_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r9.addItem($event, ctx_r9.goal_opened); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Add\"");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ToDoListComponent_div_3_Template_button_click_19_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r10.closeItem($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Add Item in Goal ", ctx_r0.goal_opened.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r0.task_desc);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r0.task_time_est);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r0.task_deadline);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r0.task_today);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r0.task_today);
} }
function ToDoListComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "form", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Add Goal");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "input", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ToDoListComponent_div_4_Template_input_ngModelChange_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r11.goal_desc = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "label", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ToDoListComponent_div_4_Template_input_ngModelChange_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r13.goal_val = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "label", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "input", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ToDoListComponent_div_4_Template_input_ngModelChange_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r14.goal_time_est = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "label", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ToDoListComponent_div_4_Template_input_ngModelChange_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r15.goal_deadline = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ToDoListComponent_div_4_Template_button_click_12_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r16.addGoal($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Add");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ToDoListComponent_div_4_Template_button_click_14_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r17.closeGoal($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r1.goal_desc);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r1.goal_val);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r1.goal_time_est);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r1.goal_deadline);
} }
function ToDoListComponent_div_7_li_2_div_10_div_1_li_2_Template(rf, ctx) { if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ToDoListComponent_div_7_li_2_div_10_div_1_li_2_Template_div_click_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r26); const task_r23 = ctx.$implicit; const goal_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3).$implicit; const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r24.deleteItem($event, goal_r19, task_r23); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const task_r23 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" Task: ", task_r23.name, " ", task_r23.time_est, " ");
} }
function ToDoListComponent_div_7_li_2_div_10_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, ToDoListComponent_div_7_li_2_div_10_div_1_li_2_Template, 7, 2, "li", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const goal_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", goal_r19.tasks);
} }
function ToDoListComponent_div_7_li_2_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ToDoListComponent_div_7_li_2_div_10_div_1_Template, 3, 1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const goal_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", goal_r19.tasks.length > 0);
} }
function ToDoListComponent_div_7_li_2_Template(rf, ctx) { if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ToDoListComponent_div_7_li_2_Template_div_click_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r30); const goal_r19 = ctx.$implicit; const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r29.openItem($event, goal_r19); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "+");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ToDoListComponent_div_7_li_2_Template_div_click_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r30); const goal_r19 = ctx.$implicit; const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r31.deleteGoal($event, goal_r19); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, ToDoListComponent_div_7_li_2_div_10_Template, 2, 1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const goal_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate3"](" Goal: ", goal_r19.name, " ", goal_r19.time_est, " ", goal_r19.value, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", goal_r19.tasks !== undefined);
} }
function ToDoListComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, ToDoListComponent_div_7_li_2_Template, 11, 4, "li", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.goals);
} }
class ToDoListComponent {
    constructor(router) {
        this.router = router;
        this.goal_form_open = true;
        this.task_form_open = true;
        this.goal_opened = ({
            name: "DEFAULT"
        });
        this.optimalList = [];
        this.barFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.items = _globals__WEBPACK_IMPORTED_MODULE_1__["Globals"].taskList;
        this.goals = _globals__WEBPACK_IMPORTED_MODULE_1__["Globals"].goalList;
    }
    get taskList() {
        return _globals__WEBPACK_IMPORTED_MODULE_1__["Globals"].taskList;
    }
    get taskLength() {
        return this.taskList.length;
    }
    get itemsList() {
        return this.items;
    }
    ngAfterViewInit() {
    }
    route() {
        console.log("Go to Optimized");
        this.router.navigateByUrl('/optimized');
    }
    openGoal(e) {
        console.log("in openGoal");
        console.log(this.goal_form_open);
        // this.closeItem(e);
        if (this.goal_form_open == true) {
            console.log("YO");
            document.getElementById("goal-form").style.display = "block";
        }
        // this.goal_form_open = false;
        // console.log(this.goal_form_open);
        // console.log("Goal Length");
        // console.log(this.goals.length);
        // return true
    }
    openItem(e, goal) {
        console.log("In openItem");
        this.goal_opened = goal;
        console.log(goal);
        // console.log(this.goals.indexOf(goal));
        this.closeGoal(e);
        document.getElementById("task-form").style.display = "block";
        return true;
    }
    closeGoal(e) {
        console.log("Close Goal Form");
        this.goal_form_open = true;
        document.getElementById("goal-form").style.display = "none";
    }
    closeItem(e) {
        console.log("Close Item Form");
        this.task_form_open = true;
        document.getElementById("task-form").style.display = "none";
    }
    addGoal(event) {
        this.goal_form_open = true;
        console.log(this.goal_desc);
        var goal = ({
            name: this.goal_desc,
            time_est: this.goal_time_est,
            deadline: this.goal_deadline,
            value: this.goal_val
        });
        if (this.goal_desc != undefined) {
            this.goals.push(goal);
            this.goal_opened = goal;
            console.log(goal);
        }
        this.goal_desc = undefined;
        this.goal_val = undefined;
        this.goal_deadline = undefined;
        this.goal_time_est = undefined;
        console.log(this.goals);
        // this.displayGoal(goal);
    }
    deleteGoal(event, goal) {
        const index = this.goals.indexOf(goal);
        if (index > -1) {
            this.goals.splice(index, 1);
        }
    }
    addItem(event, goal) {
        console.log("In AddItem");
        console.log(goal);
        var item = ({
            name: this.task_desc,
            time_est: this.task_time_est,
            deadline: this.task_deadline,
            today: this.task_today == "Not Today" ? false : true,
        });
        console.log(item);
        if (this.task_desc != undefined) {
            console.log(goal);
            if ('num_children' in goal) {
                console.log("HAVE CHILD");
                goal.tasks.push(item);
                goal.num_children += 1;
            }
            else {
                console.log("FIRST CHILD");
                goal.tasks = [];
                goal.tasks.push(item);
                goal.num_children = 1;
            }
            console.log(goal.num_children);
        }
        this.task_desc = undefined;
        this.task_today = undefined;
        this.task_deadline = undefined;
        this.task_time_est = undefined;
    }
    deleteItem(event, goal, item) {
        console.log("In deleteItem");
        console.log(goal);
        console.log(item);
        const index = goal.tasks.indexOf(item);
        console.log(index);
        if (index > -1) {
            goal.tasks.splice(index, 1);
            goal.num_children -= 1;
        }
    }
}
ToDoListComponent.ɵfac = function ToDoListComponent_Factory(t) { return new (t || ToDoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
ToDoListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ToDoListComponent, selectors: [["todo-list"]], decls: 8, vars: 3, consts: [[1, "btn", "top-fixed", 3, "click"], ["class", "form-popup", "id", "task-form", 4, "ngIf"], ["class", "form-popup", "id", "goal-form", 4, "ngIf"], [1, "btn", "bottom-fixed", 3, "click"], ["class", "goal-wrapper", "id", "goal-display", 4, "ngIf"], ["id", "task-form", 1, "form-popup"], [1, "form-container"], ["for", "item-desc"], ["type", "text", "placeholder", "Item Description", "name", "item-desc", "required", "", 3, "ngModel", "ngModelChange"], ["for", "item-time"], ["type", "text", "placeholder", "Enter Time Estimate", "name", "item-time-est", "required", "", 3, "ngModel", "ngModelChange"], ["for", "item-deadline"], ["type", "text", "placeholder", "Enter Deadline (YYYY.MM.DD)", "name", "item-deadline", 3, "ngModel", "ngModelChange"], ["for", "item-today"], ["type", "radio", "id", "nt", "name", "item-today", "value", "Not Today", 3, "ngModel", "ngModelChange"], ["for", "nt"], ["type", "radio", "id", "t", "name", "item-today", "value", "Today", 3, "ngModel", "ngModelChange"], ["for", "t"], ["type", "submit", 1, "btn", "add", 3, "click"], ["type", "submit", 1, "btn", "cancel", 3, "click"], ["id", "goal-form", 1, "form-popup"], ["for", "goal-desc"], ["type", "text", "placeholder", "Goal Description", "name", "item-desc", "required", "", 3, "ngModel", "ngModelChange"], ["for", "goal-val"], ["type", "text", "placeholder", "Goal Value", "name", "item-val", 3, "ngModel", "ngModelChange"], ["for", "goal-time"], ["type", "text", "placeholder", "Enter Time Estimate", "name", "goal-time-est", 3, "ngModel", "ngModelChange"], ["for", "goal-deadline"], ["type", "text", "placeholder", "Enter Deadline (YYYY.MM.DD)", "name", "goal-deadline", 3, "ngModel", "ngModelChange"], ["id", "goal-display", 1, "goal-wrapper"], ["class", "goal-item", 4, "ngFor", "ngForOf"], [1, "goal-item"], [1, "icon", "plus", 3, "click"], [4, "ngIf"], ["class", "task-item", 4, "ngFor", "ngForOf"], [1, "task-item"], [1, "del-wrapper"], [1, "del", 3, "click"]], template: function ToDoListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ToDoListComponent_Template_div_click_0_listener($event) { return ctx.openGoal($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Add Goals");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, ToDoListComponent_div_3_Template, 21, 6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, ToDoListComponent_div_4_Template, 16, 4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ToDoListComponent_Template_div_click_5_listener() { return ctx.route(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Gamifying List");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, ToDoListComponent_div_7_Template, 3, 1, "div", 4);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.task_form_open == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.goal_form_open == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.goals.length > 0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["RadioControlValueAccessor"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"]], styles: [".open-button[_ngcontent-%COMP%] {\n      background-color: #555;\n      color: white;\n      padding: 16px 20px;\n      border: none;\n      cursor: pointer;\n      opacity: 0.8;\n      position: fixed;\n      bottom: 23px;\n      right: 28px;\n      width: 280px;\n    }\n\n    \n    .form-popup[_ngcontent-%COMP%] {\n      display: none;\n      position: fixed;\n      bottom: 0;\n      right: 15px;\n      border: 3px solid #f1f1f1;\n      z-index: 9;\n    }\n\n    \n    .form-container[_ngcontent-%COMP%] {\n      max-width: 300px;\n      padding: 10px;\n      background-color: white;\n    }\n\n    \n    .form-container[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%], .form-container[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%] {\n      width: 100%;\n      padding: 15px;\n      margin: 5px 0 22px 0;\n      border: none;\n      background: #f1f1f1;\n    }\n\n    \n    .form-container[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]:focus, .form-container[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]:focus {\n      background-color: #ddd;\n      outline: none;\n    }\n\n    \n    .form-container[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n      background-color: #4CAF50;\n      color: white;\n      padding: 16px 20px;\n      border: none;\n      cursor: pointer;\n      width: 100%;\n      margin-bottom:10px;\n      opacity: 0.8;\n    }\n\n    \n    .form-container[_ngcontent-%COMP%]   .cancel[_ngcontent-%COMP%] {\n      background-color: red;\n    }\n\n    .form-container[_ngcontent-%COMP%]   .add[_ngcontent-%COMP%]{\n    }\n\n    \n    .form-container[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover, .open-button[_ngcontent-%COMP%]:hover {\n      opacity: 1;\n    }\n\n    .switch[_ngcontent-%COMP%] {\n      position: relative;\n      display: inline-block;\n      width: 60px;\n      height: 34px;\n    }\n    \n    .switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { \n      opacity: 0;\n      width: 0;\n      height: 0;\n    }\n    \n    .slider[_ngcontent-%COMP%] {\n      position: absolute;\n      cursor: pointer;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      background-color: #ccc;\n      -webkit-transition: .4s;\n      transition: .4s;\n    }\n    \n    .slider[_ngcontent-%COMP%]:before {\n      position: absolute;\n      content: \"\";\n      height: 26px;\n      width: 26px;\n      left: 4px;\n      bottom: 4px;\n      background-color: white;\n      -webkit-transition: .4s;\n      transition: .4s;\n    }\n    \n    input[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%] {\n      background-color: #2196F3;\n    }\n    \n    input[_ngcontent-%COMP%]:focus    + .slider[_ngcontent-%COMP%] {\n      box-shadow: 0 0 1px #2196F3;\n    }\n    \n    input[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%]:before {\n      -webkit-transform: translateX(26px);\n      -ms-transform: translateX(26px);\n      transform: translateX(26px);\n    }\n    \n    \n    .slider.round[_ngcontent-%COMP%] {\n      border-radius: 34px;\n    }\n    \n    .slider.round[_ngcontent-%COMP%]:before {\n      border-radius: 50%;\n    }\n\n    .item-desc-wrapper[_ngcontent-%COMP%] {\n\n      display:flex;\n      border: 5px solid gray;\n\n    }\n    .desc-field[_ngcontent-%COMP%] {\n      width: 50%;\n    }\n\n\n      .goal-wrapper[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{\n       width: 100%;\n       display:flex;\n      }\n\n      .goal-item[_ngcontent-%COMP%]{\n        width: 33%;\n        min-width: 300px;\n        display: inline-block;\n        text-align: center;\n        background: #33cc33;\n        border-radius: 25px;\n        \n      }\n      .task-wrapper[_ngcontent-%COMP%]{\n        display: grid;\n      }\n      .task-item[_ngcontent-%COMP%]{\n        width: 33%;\n        min-height: 50px;\n        display: inline-block;\n        text-align: center;\n        background: #77b300;\n        border-radius: 25px;\n      }\n      .btn.bottom-fixed[_ngcontent-%COMP%] {\n\n        position: fixed;\n\n        bottom: 20px;\n        left: 10%\n      }\n      .del-wrapper[_ngcontent-%COMP%]{\n        position: relative;\n      }\n      .del[_ngcontent-%COMP%]{\n        position: absolute;\n        top: 0px;\n        cursor: pointer;\n        display: inline-grid;\n        width: 5%;\n        min-width: 20px;\n        height: 5%;\n        min-height: 20px;\n        margin-left: 10px;\n        margin-right: 10px;\n        margin-bottom: 10px;\n        background-size: 100%;\n        color: white;\n        background-color: red;\n        border-radius: 100%;\n        background-repeat: no-repeat;\n        background-position: center center;\n      }"] });


/***/ }),

/***/ "jLYy":
/*!*****************************************!*\
  !*** ./src/app/guards/resolve.guard.ts ***!
  \*****************************************/
/*! exports provided: ResolveGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResolveGuard", function() { return ResolveGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _provider_item_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../provider/item.service */ "tl+q");


class ResolveGuard {
    constructor(itemService) {
        this.itemService = itemService;
    }
    resolve() {
        console.log("Running Resovle Guard. API Running");
        return this.itemService.getOptimalList();
    }
}
ResolveGuard.ɵfac = function ResolveGuard_Factory(t) { return new (t || ResolveGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_provider_item_service__WEBPACK_IMPORTED_MODULE_1__["ItemService"])); };
ResolveGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ResolveGuard, factory: ResolveGuard.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "n5Wg":
/*!***************************************************!*\
  !*** ./src/app/views/optimized-list.component.ts ***!
  \***************************************************/
/*! exports provided: OptimizedListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptimizedListComponent", function() { return OptimizedListComponent; });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ "xa+l");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");




function OptimizedListComponent_ul_3_li_8_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function OptimizedListComponent_ul_3_li_8_Template_li_click_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r3.toggleOpacity($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r2.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r2.val);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", item_r2.est, " minutes");
} }
function OptimizedListComponent_ul_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Task");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Psuedo Reward");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Estimated Time");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, OptimizedListComponent_ul_3_li_8_Template, 7, 3, "li", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.optList);
} }
class OptimizedListComponent {
    constructor(router, activatedRoute) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.optList = _globals__WEBPACK_IMPORTED_MODULE_0__["Globals"].optTaskList;
        console.log('In optimized page constructor');
        console.log(this.optList);
        console.log("length");
        console.log(this.optList.length > 0);
    }
    ngOnInit() {
        console.log("In Running Algo");
        this.optList = this.activatedRoute.snapshot.data['optList'];
        _globals__WEBPACK_IMPORTED_MODULE_0__["Globals"].optTaskList = this.optList;
        console.log('API finished. In optimed page');
        console.log(this.optList);
        // this.itemService.getOptimalList().subscribe((optList)=> {
        //   console.log("RUNNING");
        //   Globals.optTaskList = optList;
        //   console.log(optList);
        // })
    }
    toggleOpacity(e) {
        let ele = e.target.closest('li');
        if (ele.getAttribute('checked') == 'true') {
            ele.style.opacity = '1';
            ele.setAttribute('checked', 'false');
        }
        else {
            ele.style.opacity = '.3';
            ele.setAttribute('checked', 'true');
        }
    }
    titleCase(str) {
        let splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }
}
OptimizedListComponent.ɵfac = function OptimizedListComponent_Factory(t) { return new (t || OptimizedListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"])); };
OptimizedListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: OptimizedListComponent, selectors: [["optimized"]], decls: 4, vars: 1, consts: [["id", "todo-list-wrapper"], [4, "ngIf"], [1, "item-amount"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"]], template: function OptimizedListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Optimized To-Do List");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, OptimizedListComponent_ul_3_Template, 9, 1, "ul", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.optList.length > 0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"]], styles: ["#todo-list-wrapper[_ngcontent-%COMP%] {\n      margin-bottom: 100px;\n    }\n    \n    #todo-list-wrapper[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n    }\n  \n    #todo-list-wrapper[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n      position: relative;\n      display: flex;\n      justify-content: space-between;\n      width: 100%;\n      box-sizing:border-box;\n      padding: 2.5%;\n      text-align:center;\n      cursor:pointer;\n      border-bottom: 1px solid #777;\n    }\n    #todo-list-wrapper[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n      cursor:default;\n      border: none;\n    }\n    #todo-list-wrapper[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:first-child {\n      cursor:default;\n      font-size: 1.2rem;\n    }\n\n    #todo-list-wrapper[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n      width: 20%;\n      text-align:left;\n    }\n\n    #todo-list-wrapper[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n      width: 100%;\n    }\n\n    #todo-list-wrapper[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .item-bar[_ngcontent-%COMP%] {\n  \n      display: flex;\n      justify-content:center;\n      width: 90%;\n      height: 50px;\n      line-height: 50px;\n    }\n\n    #todo-list-wrapper[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .item-bar[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n\n    }"] });


/***/ }),

/***/ "tl+q":
/*!******************************************!*\
  !*** ./src/app/provider/item.service.ts ***!
  \******************************************/
/*! exports provided: ItemService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemService", function() { return ItemService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globals */ "xa+l");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




class ItemService {
    constructor(http) {
        this.http = http;
        // private gamifyUrl: string = 'http:///127.0.0.1:6789/api/constant/basic/30/14/inf/0/7000/0/60/t/2/10/tree/u123/getTasksForToday'
        this.gamifyUrl = 'https://aqueous-hollows-34193.herokuapp.com/api/smdp/mdp/30/14/inf/0/inf/0/inf/false/0/max/0.999999/0.1/2/1.39/0.0001/0.01/tree/__test__/getTasksForToday';
    }
    makeProject() {
        console.log("In makeProject");
        let project = [];
        for (let i = 1; i < _globals__WEBPACK_IMPORTED_MODULE_1__["Globals"].goalList.length + 1; i++) {
            console.log(i);
            var node = {
                id: "g" + i,
                nm: "#CG" + i + "_" + _globals__WEBPACK_IMPORTED_MODULE_1__["Globals"].goalList[i - 1].name + " ==" + _globals__WEBPACK_IMPORTED_MODULE_1__["Globals"].goalList[i - 1].value + " ~~" + _globals__WEBPACK_IMPORTED_MODULE_1__["Globals"].goalList[i - 1].time_est + "h DUE:" + _globals__WEBPACK_IMPORTED_MODULE_1__["Globals"].goalList[i - 1].deadline,
                lm: 0,
                ch: null,
                parentId: "None"
            };
            if ('num_children' in _globals__WEBPACK_IMPORTED_MODULE_1__["Globals"].goalList[i - 1] && _globals__WEBPACK_IMPORTED_MODULE_1__["Globals"].goalList[i - 1].num_children > 0) {
                node.ch = [];
                for (let j = 1; j < _globals__WEBPACK_IMPORTED_MODULE_1__["Globals"].goalList[i - 1].num_children + 1; j++) {
                    let td = _globals__WEBPACK_IMPORTED_MODULE_1__["Globals"].goalList[i - 1].tasks[j - 1].today ? " #today" : " #future";
                    var task = {
                        id: "g" + i + "-t" + j,
                        nm: _globals__WEBPACK_IMPORTED_MODULE_1__["Globals"].goalList[i - 1].tasks[j - 1].name + " ~~" + _globals__WEBPACK_IMPORTED_MODULE_1__["Globals"].goalList[i - 1].tasks[j - 1].time_est + "h" + td,
                        lm: 0,
                        parentId: node.id
                    };
                    node.ch.push(task);
                }
            }
            console.log("NODE", node);
            project.push(node);
            console.log("Project");
            console.log(project);
            console.log("String Project");
            JSON.stringify(project);
            console.log(project);
        }
        return project;
    }
    make_typical_hours() {
        let list = [];
        let obj = {
            id: "_",
            nm: "#HOURS_TYPICAL ==12",
            lm: 0
        };
        list.push(obj);
        JSON.stringify(list);
        console.log('Typ Hours', list);
        return list;
    }
    make_today_hours() {
        let list = [];
        let obj = {
            id: "_",
            nm: "#HOURS_TODAY ==12",
            lm: 0
        };
        list.push(obj);
        JSON.stringify(list);
        console.log('Today Hours', list);
        return list;
    }
    getOptimalList() {
        let list = {};
        // Globals.taskList.forEach(li => {
        //     list[li.name.toLowerCase()] = li.amount
        // })
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({
            'Content-Type': 'application/json',
        });
        const options = {
            headers,
        };
        console.log("Making List to be sent to API");
        let project = this.makeProject();
        console.log("Returned from makeProject");
        let typical_hours = this.make_typical_hours();
        let today_hours = this.make_today_hours();
        console.log("Make Today Hours");
        console.log(today_hours);
        let body = {
            currentIntentionsList: [],
            projects: project,
            timezoneOffsetMinutes: 0,
            today_hours: today_hours,
            typical_hours: typical_hours,
            updated: 0,
            userkey: '__test__',
            bias: 683.2111000706025,
            scale: 1.1,
            time_frame: 480
        };
        console.log("Body of POST");
        console.log(body);
        return this.http.post(this.gamifyUrl, body, options);
    }
}
ItemService.ɵfac = function ItemService_Factory(t) { return new (t || ItemService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
ItemService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: ItemService, factory: ItemService.ɵfac });


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _guards_resolve_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./guards/resolve.guard */ "jLYy");
/* harmony import */ var _views_optimized_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/optimized-list.component */ "n5Wg");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





const routes = [
    { path: 'optimized',
        component: _views_optimized_list_component__WEBPACK_IMPORTED_MODULE_2__["OptimizedListComponent"],
        resolve: {
            optList: _guards_resolve_guard__WEBPACK_IMPORTED_MODULE_1__["ResolveGuard"],
        }
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "wj+i":
/*!******************************************!*\
  !*** ./src/app/views/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");


class LoginComponent {
    constructor(router) {
        this.router = router;
    }
    route() {
        this.router.navigateByUrl('/list');
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["login"]], decls: 7, vars: 0, consts: [["id", "login-wrapper"], [2, "text-align", "center"], ["src", "./assets/images/logo.png", 2, "height", "200px"], [1, "btn", 3, "click"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LoginComponent_Template_div_click_3_listener() { return ctx.route(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LoginComponent_Template_div_click_5_listener() { return ctx.route(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Register");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["#login-wrapper[_ngcontent-%COMP%] {\n        display:flex;\n        align-items:center;\n        flex-direction: column;\n        text-align:center;\n    }\n    #login-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n\n        height: 100px;\n    }\n    #login-wrapper[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n\n        margin-top: 20px;\n    }"] });


/***/ }),

/***/ "xa+l":
/*!****************************!*\
  !*** ./src/app/globals.ts ***!
  \****************************/
/*! exports provided: Globals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Globals", function() { return Globals; });
class Globals {
}
Globals.taskList = [];
Globals.goalList = [];
Globals.optTaskList = [];


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map