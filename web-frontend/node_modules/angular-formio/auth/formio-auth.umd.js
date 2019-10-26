(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('lodash'), require('formiojs')) :
    typeof define === 'function' && define.amd ? define('authComponent', ['exports', '@angular/core', 'lodash', 'formiojs'], factory) :
    (global = global || self, factory(global['formio-auth'] = {}, global.core, global.lodash, global.formiojs));
}(this, function (exports, core, lodash, formiojs) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormioAuthConfig = /** @class */ (function () {
        function FormioAuthConfig() {
        }
        FormioAuthConfig.decorators = [
            { type: core.Injectable },
        ];
        return FormioAuthConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormioAppConfig = /** @class */ (function () {
        function FormioAppConfig() {
            this.appUrl = '';
            this.apiUrl = '';
        }
        FormioAppConfig.decorators = [
            { type: core.Injectable },
        ];
        return FormioAppConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormioAuthService = /** @class */ (function () {
        function FormioAuthService(appConfig, config) {
            var _this = this;
            this.appConfig = appConfig;
            this.config = config;
            this.authenticated = false;
            this.formAccess = {};
            this.submissionAccess = {};
            this.is = {};
            this.user = null;
            if (this.appConfig && this.appConfig.appUrl) {
                formiojs.Formio.setBaseUrl(this.appConfig.apiUrl);
                formiojs.Formio.setProjectUrl(this.appConfig.appUrl);
                formiojs.Formio.formOnly = !!this.appConfig.formOnly;
            }
            else {
                console.error('You must provide an AppConfig within your application!');
            }
            if (this.config.project) {
                formiojs.Formio.setAuthUrl(this.config.project);
            }
            this.loginForm =
                (this.config.project || this.appConfig.appUrl) +
                    '/' +
                    lodash.get(this.config, 'login.form', 'user/login');
            this.registerForm =
                (this.config.project || this.appConfig.appUrl) +
                    '/' +
                    lodash.get(this.config, 'register.form', 'user/login');
            this.onLogin = new core.EventEmitter();
            this.onLogout = new core.EventEmitter();
            this.onRegister = new core.EventEmitter();
            this.onUser = new core.EventEmitter();
            this.onError = new core.EventEmitter();
            this.ready = new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                _this.readyResolve = resolve;
                _this.readyReject = reject;
            }));
            // Register for the core events.
            formiojs.Formio.events.on('formio.badToken', (/**
             * @return {?}
             */
            function () { return _this.logoutError(); }));
            formiojs.Formio.events.on('formio.sessionExpired', (/**
             * @return {?}
             */
            function () { return _this.logoutError(); }));
            if (!this.config.delayAuth) {
                this.init();
            }
        }
        /**
         * @param {?} submission
         * @return {?}
         */
        FormioAuthService.prototype.onLoginSubmit = /**
         * @param {?} submission
         * @return {?}
         */
        function (submission) {
            this.setUser(submission);
            this.onLogin.emit(submission);
        };
        /**
         * @param {?} submission
         * @return {?}
         */
        FormioAuthService.prototype.onRegisterSubmit = /**
         * @param {?} submission
         * @return {?}
         */
        function (submission) {
            this.setUser(submission);
            this.onRegister.emit(submission);
        };
        /**
         * @return {?}
         */
        FormioAuthService.prototype.init = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.projectReady = formiojs.Formio.makeStaticRequest(this.appConfig.appUrl).then((/**
             * @param {?} project
             * @return {?}
             */
            function (project) {
                lodash.each(project.access, (/**
                 * @param {?} access
                 * @return {?}
                 */
                function (access) {
                    _this.formAccess[access.type] = access.roles;
                }));
            }), (/**
             * @return {?}
             */
            function () {
                _this.formAccess = {};
                return null;
            }));
            // Get the access for this project.
            this.accessReady = formiojs.Formio.makeStaticRequest(this.appConfig.appUrl + '/access').then((/**
             * @param {?} access
             * @return {?}
             */
            function (access) {
                lodash.each(access.forms, (/**
                 * @param {?} form
                 * @return {?}
                 */
                function (form) {
                    _this.submissionAccess[form.name] = {};
                    form.submissionAccess.forEach((/**
                     * @param {?} subAccess
                     * @return {?}
                     */
                    function (subAccess) {
                        _this.submissionAccess[form.name][subAccess.type] = subAccess.roles;
                    }));
                }));
                _this.roles = access.roles;
                return access;
            }), (/**
             * @return {?}
             */
            function () {
                _this.roles = {};
                return null;
            }));
            this.userReady = formiojs.Formio.currentUser().then((/**
             * @param {?} user
             * @return {?}
             */
            function (user) {
                _this.setUser(user);
                return user;
            }));
            // Trigger we are redy when all promises have resolved.
            if (this.accessReady) {
                this.accessReady
                    .then((/**
                 * @return {?}
                 */
                function () { return _this.projectReady; }))
                    .then((/**
                 * @return {?}
                 */
                function () { return _this.userReady; }))
                    .then((/**
                 * @return {?}
                 */
                function () { return _this.readyResolve(true); }))
                    .catch((/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) { return _this.readyReject(err); }));
            }
        };
        /**
         * @param {?} user
         * @return {?}
         */
        FormioAuthService.prototype.setUser = /**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            /** @type {?} */
            var namespace = formiojs.Formio.namespace || 'formio';
            if (user) {
                this.user = user;
                localStorage.setItem(namespace + "AppUser", JSON.stringify(user));
                this.setUserRoles();
            }
            else {
                this.user = null;
                this.is = {};
                localStorage.removeItem(namespace + "AppUser");
                formiojs.Formio.clearCache();
                formiojs.Formio.setUser(null);
            }
            this.authenticated = !!formiojs.Formio.getToken();
            this.onUser.emit(this.user);
        };
        /**
         * @return {?}
         */
        FormioAuthService.prototype.setUserRoles = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.accessReady) {
                this.accessReady.then((/**
                 * @return {?}
                 */
                function () {
                    lodash.each(_this.roles, (/**
                     * @param {?} role
                     * @param {?} roleName
                     * @return {?}
                     */
                    function (role, roleName) {
                        if (_this.user.roles.indexOf(role._id) !== -1) {
                            _this.is[roleName] = true;
                        }
                    }));
                }));
            }
        };
        /**
         * @return {?}
         */
        FormioAuthService.prototype.logoutError = /**
         * @return {?}
         */
        function () {
            this.setUser(null);
            localStorage.removeItem('formioToken');
            this.onError.emit();
        };
        /**
         * @return {?}
         */
        FormioAuthService.prototype.logout = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.setUser(null);
            localStorage.removeItem('formioToken');
            formiojs.Formio.logout()
                .then((/**
             * @return {?}
             */
            function () { return _this.onLogout.emit(); }))
                .catch((/**
             * @return {?}
             */
            function () { return _this.logoutError(); }));
        };
        FormioAuthService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        FormioAuthService.ctorParameters = function () { return [
            { type: FormioAppConfig },
            { type: FormioAuthConfig }
        ]; };
        return FormioAuthService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormioAuthRegisterComponent = /** @class */ (function () {
        function FormioAuthRegisterComponent(service) {
            this.service = service;
        }
        FormioAuthRegisterComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<formio [src]=\"service.registerForm\" (submit)=\"service.onRegisterSubmit($event)\" [submitOptions]=\"{ skipQueue: true }\"></formio> "
                    },] },
        ];
        /** @nocollapse */
        FormioAuthRegisterComponent.ctorParameters = function () { return [
            { type: FormioAuthService }
        ]; };
        return FormioAuthRegisterComponent;
    }());

    exports.FormioAuthRegisterComponent = FormioAuthRegisterComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
