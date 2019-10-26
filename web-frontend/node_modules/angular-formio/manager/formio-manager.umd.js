(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('formiojs'), require('lodash'), require('lodash/each'), require('lodash/intersection')) :
    typeof define === 'function' && define.amd ? define('formManagerConfig', ['exports', '@angular/core', 'formiojs', 'lodash', 'lodash/each', 'lodash/intersection'], factory) :
    (global = global || self, factory(global['formio-manager'] = {}, global.core, global.formiojs, global.lodash, global._each, global._intersection));
}(this, function (exports, core, formiojs, lodash, _each, _intersection) { 'use strict';

    _each = _each && _each.hasOwnProperty('default') ? _each['default'] : _each;
    _intersection = _intersection && _intersection.hasOwnProperty('default') ? _intersection['default'] : _intersection;

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
    var FormManagerConfig = /** @class */ (function () {
        function FormManagerConfig() {
            this.tag = '';
            this.includeSearch = false;
            this.saveDraft = false;
        }
        FormManagerConfig.decorators = [
            { type: core.Injectable },
        ];
        return FormManagerConfig;
    }());

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
    var FormManagerService = /** @class */ (function () {
        function FormManagerService(appConfig, config, auth) {
            var _this = this;
            this.appConfig = appConfig;
            this.config = config;
            this.auth = auth;
            this.form = null;
            this.perms = { delete: false, edit: false };
            if (this.appConfig && this.appConfig.appUrl) {
                formiojs.Formio.setBaseUrl(this.appConfig.apiUrl);
                formiojs.Formio.setProjectUrl(this.appConfig.appUrl);
            }
            else {
                console.error('You must provide an AppConfig within your application!');
            }
            this.allAccessMap = {
                'update_all': 'formEdit',
                'delete_all': 'formDelete'
            };
            this.ownAccessMap = {
                'update_own': 'formEdit',
                'delete_own': 'formDelete'
            };
            this.actionAllowed = (/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return _this.isActionAllowed(action); });
            this.reset();
        }
        /**
         * @param {?} action
         * @return {?}
         */
        FormManagerService.prototype.isActionAllowed = /**
         * @param {?} action
         * @return {?}
         */
        function (action) {
            return this.access[action];
        };
        /**
         * @return {?}
         */
        FormManagerService.prototype.setAccess = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.access = {
                formCreate: true,
                formView: true,
                formEdit: true,
                formDelete: true,
                submissionIndex: true
            };
            if (this.auth) {
                this.access = {
                    formCreate: false,
                    formView: false,
                    formEdit: false,
                    formDelete: false,
                    submissionIndex: false
                };
                this.ready = this.auth.ready.then((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var adminRoles = [];
                    _each(_this.auth.roles, (/**
                     * @param {?} role
                     * @param {?} name
                     * @return {?}
                     */
                    function (role, name) {
                        if (role.admin) {
                            adminRoles.push(role._id);
                        }
                    }));
                    if (_this.auth.user && _this.auth.user.roles) {
                        _this.auth.user.roles.forEach((/**
                         * @param {?} roleId
                         * @return {?}
                         */
                        function (roleId) {
                            if (adminRoles.indexOf(roleId) !== -1) {
                                _this.access.formCreate = true;
                                _this.access.formView = true;
                                _this.access.formEdit = true;
                                _this.access.formDelete = true;
                                _this.access.submissionIndex = true;
                            }
                            if (!_this.access.formCreate) {
                                _this.access.formCreate = (_this.auth.formAccess.create_all.indexOf(roleId) !== -1);
                            }
                            if (!_this.access.formView) {
                                _this.access.formView = (_this.auth.formAccess.read_all.indexOf(roleId) !== -1);
                            }
                            if (!_this.access.formEdit) {
                                _this.access.formEdit = (_this.auth.formAccess.update_all.indexOf(roleId) !== -1);
                            }
                            if (!_this.access.formDelete) {
                                _this.access.formDelete = (_this.auth.formAccess.delete_all.indexOf(roleId) !== -1);
                            }
                            if (!_this.access.submissionIndex) {
                                _this.access.submissionIndex = (_this.auth.formAccess.read_all.indexOf(roleId) !== -1);
                            }
                        }));
                    }
                }));
            }
            else {
                this.ready = Promise.resolve(false);
            }
        };
        /**
         * @param {?=} route
         * @return {?}
         */
        FormManagerService.prototype.reset = /**
         * @param {?=} route
         * @return {?}
         */
        function (route) {
            var _this = this;
            if (route) {
                route.params.subscribe((/**
                 * @param {?} params
                 * @return {?}
                 */
                function (params) {
                    if (params.id) {
                        _this.formio = new formiojs.Formio(_this.formio.formsUrl + "/" + params.id);
                    }
                    else {
                        _this.reset();
                    }
                }));
            }
            else {
                this.formio = new formiojs.Formio(this.appConfig.appUrl);
                this.setAccess();
            }
        };
        /**
         * @param {?} roles
         * @return {?}
         */
        FormManagerService.prototype.hasAccess = /**
         * @param {?} roles
         * @return {?}
         */
        function (roles) {
            if (!this.auth.user) {
                return false;
            }
            return !!_intersection(roles, this.auth.user.roles).length;
        };
        /**
         * @param {?} form
         * @return {?}
         */
        FormManagerService.prototype.setForm = /**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            var _this = this;
            this.form = form;
            if (form.access) {
                // Check if they have access here.
                form.access.forEach((/**
                 * @param {?} access
                 * @return {?}
                 */
                function (access) {
                    // Check for all access.
                    if (_this.allAccessMap[access.type] && !_this.access[_this.allAccessMap[access.type]]) {
                        _this.access[_this.allAccessMap[access.type]] = _this.hasAccess(access.roles);
                    }
                    // Check for own access.
                    if (_this.auth && _this.auth.user &&
                        (form._id === _this.auth.user._id) &&
                        _this.ownAccessMap[access.type] &&
                        !_this.access[_this.ownAccessMap[access.type]]) {
                        _this.access[_this.ownAccessMap[access.type]] = _this.hasAccess(access.roles);
                    }
                }));
            }
            return form;
        };
        /**
         * @return {?}
         */
        FormManagerService.prototype.loadForm = /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this.formio.loadForm().then((/**
             * @param {?} form
             * @return {?}
             */
            function (form) { return _this.setForm(form); }));
        };
        /**
         * @param {?} route
         * @return {?}
         */
        FormManagerService.prototype.setSubmission = /**
         * @param {?} route
         * @return {?}
         */
        function (route) {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            function (resolve) {
                route.params.subscribe((/**
                 * @param {?} params
                 * @return {?}
                 */
                function (params) {
                    _this.formio = new formiojs.Formio(_this.formio.submissionsUrl + "/" + params.id);
                    resolve(_this.formio);
                }));
            }));
        };
        /**
         * @param {?} submission
         * @return {?}
         */
        FormManagerService.prototype.submissionLoaded = /**
         * @param {?} submission
         * @return {?}
         */
        function (submission) {
            var _this = this;
            this.auth.ready.then((/**
             * @return {?}
             */
            function () {
                _this.formio.userPermissions(_this.auth.user, _this.form, submission).then((/**
                 * @param {?} perms
                 * @return {?}
                 */
                function (perms) {
                    _this.perms.delete = perms.delete;
                    _this.perms.edit = perms.edit;
                }));
            }));
        };
        /**
         * @return {?}
         */
        FormManagerService.prototype.loadForms = /**
         * @return {?}
         */
        function () {
            return this.formio.loadForms({ params: {
                    tags: this.config.tag
                } });
        };
        /**
         * @param {?} form
         * @return {?}
         */
        FormManagerService.prototype.createForm = /**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            return this.formio.createform(form);
        };
        FormManagerService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        FormManagerService.ctorParameters = function () { return [
            { type: FormioAppConfig },
            { type: FormManagerConfig },
            { type: FormioAuthService }
        ]; };
        return FormManagerService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SubmissionViewComponent = /** @class */ (function () {
        function SubmissionViewComponent(service) {
            this.service = service;
        }
        SubmissionViewComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<formio [renderer]=\"service.config.renderer\" [src]=\"service.formio.submissionUrl\" [readOnly]=\"true\" (formLoad)=\"service.setForm($event)\" (submissionLoad)=\"service.submissionLoaded($event)\" ></formio> "
                    },] },
        ];
        /** @nocollapse */
        SubmissionViewComponent.ctorParameters = function () { return [
            { type: FormManagerService }
        ]; };
        return SubmissionViewComponent;
    }());

    exports.SubmissionViewComponent = SubmissionViewComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
