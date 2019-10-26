(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('lodash'), require('formiojs'), require('native-promise-only')) :
    typeof define === 'function' && define.amd ? define('formioResource', ['exports', '@angular/core', 'lodash', 'formiojs', 'native-promise-only'], factory) :
    (global = global || self, factory(global['formio-resource'] = {}, global.core, global._, global.formiojs, global.Promise$1));
}(this, function (exports, core, _, formiojs, Promise$1) { 'use strict';

    var ___default = 'default' in _ ? _['default'] : _;
    Promise$1 = Promise$1 && Promise$1.hasOwnProperty('default') ? Promise$1['default'] : Promise$1;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormioResourceConfig = /** @class */ (function () {
        function FormioResourceConfig() {
            this.name = '';
            this.form = '';
            this.parents = [];
        }
        FormioResourceConfig.decorators = [
            { type: core.Injectable },
        ];
        return FormioResourceConfig;
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
                    _.get(this.config, 'login.form', 'user/login');
            this.registerForm =
                (this.config.project || this.appConfig.appUrl) +
                    '/' +
                    _.get(this.config, 'register.form', 'user/login');
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
                _.each(project.access, (/**
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
                _.each(access.forms, (/**
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
                    _.each(_this.roles, (/**
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
    var FormioResources = /** @class */ (function () {
        function FormioResources(auth) {
            this.auth = auth;
            this.resources = {};
            this.error = new core.EventEmitter();
            this.onError = this.error;
            this.resources = {
                currentUser: {
                    resourceLoaded: this.auth.userReady
                }
            };
        }
        FormioResources.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        FormioResources.ctorParameters = function () { return [
            { type: FormioAuthService }
        ]; };
        return FormioResources;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormioAlerts = /** @class */ (function () {
        function FormioAlerts() {
            this.alerts = [];
        }
        /**
         * @param {?} alert
         * @return {?}
         */
        FormioAlerts.prototype.setAlert = /**
         * @param {?} alert
         * @return {?}
         */
        function (alert) {
            this.alerts = [alert];
        };
        /**
         * @param {?} alert
         * @return {?}
         */
        FormioAlerts.prototype.addAlert = /**
         * @param {?} alert
         * @return {?}
         */
        function (alert) {
            this.alerts.push(alert);
        };
        /**
         * @param {?} alerts
         * @return {?}
         */
        FormioAlerts.prototype.setAlerts = /**
         * @param {?} alerts
         * @return {?}
         */
        function (alerts) {
            this.alerts = alerts;
        };
        return FormioAlerts;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormioLoader = /** @class */ (function () {
        function FormioLoader() {
            this.loading = true;
        }
        FormioLoader.decorators = [
            { type: core.Injectable },
        ];
        return FormioLoader;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormioResourceService = /** @class */ (function () {
        function FormioResourceService(appConfig, config, loader, resourcesService) {
            var _this = this;
            this.appConfig = appConfig;
            this.config = config;
            this.loader = loader;
            this.resourcesService = resourcesService;
            this.initialized = false;
            this.alerts = new FormioAlerts();
            this.refresh = new core.EventEmitter();
            this.formLoaded = new Promise$1((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                _this.formResolve = resolve;
                _this.formReject = reject;
            }));
            this.init();
        }
        /**
         * @return {?}
         */
        FormioResourceService.prototype.initialize = /**
         * @return {?}
         */
        function () {
            console.warn('FormioResourceService.initialize() has been deprecated.');
        };
        /**
         * @return {?}
         */
        FormioResourceService.prototype.init = /**
         * @return {?}
         */
        function () {
            if (this.initialized) {
                return;
            }
            this.initialized = true;
            if (this.appConfig && this.appConfig.appUrl) {
                formiojs.Formio.setBaseUrl(this.appConfig.apiUrl);
                formiojs.Formio.setProjectUrl(this.appConfig.appUrl);
                formiojs.Formio.formOnly = this.appConfig.formOnly;
            }
            else {
                console.error('You must provide an AppConfig within your application!');
            }
            // Create the form url and load the resources.
            this.formUrl = this.appConfig.appUrl + '/' + this.config.form;
            this.resource = { data: {} };
            // Add this resource service to the list of all resources in context.
            if (this.resourcesService) {
                this.resources = this.resourcesService.resources;
                this.resources[this.config.name] = this;
            }
            return this.loadForm();
        };
        /**
         * @param {?} error
         * @return {?}
         */
        FormioResourceService.prototype.onError = /**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            this.alerts.setAlert({
                type: 'danger',
                message: error.message || error
            });
            if (this.resourcesService) {
                this.resourcesService.error.emit(error);
            }
            throw error;
        };
        /**
         * @param {?} err
         * @return {?}
         */
        FormioResourceService.prototype.onFormError = /**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            this.formReject(err);
            this.onError(err);
        };
        /**
         * @param {?} route
         * @return {?}
         */
        FormioResourceService.prototype.setContext = /**
         * @param {?} route
         * @return {?}
         */
        function (route) {
            this.resourceId = route.snapshot.params['id'];
            this.resource = { data: {} };
            this.resourceUrl = this.appConfig.appUrl + '/' + this.config.form;
            if (this.resourceId) {
                this.resourceUrl += '/submission/' + this.resourceId;
            }
            this.formio = new formiojs.Formio(this.resourceUrl);
            if (this.resourcesService) {
                this.resources[this.config.name] = this;
            }
            this.loadParents();
        };
        /**
         * @return {?}
         */
        FormioResourceService.prototype.loadForm = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.formFormio = new formiojs.Formio(this.formUrl);
            this.loader.loading = true;
            this.formLoading = this.formFormio
                .loadForm()
                .then((/**
             * @param {?} form
             * @return {?}
             */
            function (form) {
                _this.form = form;
                _this.formResolve(form);
                _this.loader.loading = false;
                _this.loadParents();
                return form;
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onFormError(err); }))
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onFormError(err); }));
            return this.formLoading;
        };
        /**
         * @return {?}
         */
        FormioResourceService.prototype.loadParents = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.config.parents || !this.config.parents.length) {
                return Promise$1.resolve([]);
            }
            if (!this.resourcesService) {
                console.warn('You must provide the FormioResources within your application to use nested resources.');
                return Promise$1.resolve([]);
            }
            return this.formLoading.then((/**
             * @param {?} form
             * @return {?}
             */
            function (form) {
                // Iterate through the list of parents.
                /** @type {?} */
                var _parentsLoaded = [];
                _this.config.parents.forEach((/**
                 * @param {?} parent
                 * @return {?}
                 */
                function (parent) {
                    /** @type {?} */
                    var resourceName = parent.resource || parent;
                    /** @type {?} */
                    var resourceField = parent.field || parent;
                    /** @type {?} */
                    var filterResource = parent.hasOwnProperty('filter') ? parent.filter : true;
                    if (_this.resources.hasOwnProperty(resourceName) && _this.resources[resourceName].resourceLoaded) {
                        _parentsLoaded.push(_this.resources[resourceName].resourceLoaded.then((/**
                         * @param {?} resource
                         * @return {?}
                         */
                        function (resource) {
                            /** @type {?} */
                            var parentPath = '';
                            formiojs.Utils.eachComponent(form.components, (/**
                             * @param {?} component
                             * @param {?} path
                             * @return {?}
                             */
                            function (component, path) {
                                if (component.key === resourceField) {
                                    component.hidden = true;
                                    component.clearOnHide = false;
                                    ___default.set(_this.resource.data, path, resource);
                                    parentPath = path;
                                    return true;
                                }
                            }));
                            return {
                                name: parentPath,
                                filter: filterResource,
                                resource: resource
                            };
                        })));
                    }
                }));
                // When all the parents have loaded, emit that to the onParents emitter.
                return Promise$1.all(_parentsLoaded).then((/**
                 * @param {?} parents
                 * @return {?}
                 */
                function (parents) {
                    _this.refresh.emit({
                        form: form,
                        submission: _this.resource
                    });
                    return parents;
                }));
            }));
        };
        /**
         * @param {?} err
         * @return {?}
         */
        FormioResourceService.prototype.onSubmissionError = /**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            this.onError(err);
        };
        /**
         * @param {?} route
         * @return {?}
         */
        FormioResourceService.prototype.loadResource = /**
         * @param {?} route
         * @return {?}
         */
        function (route) {
            var _this = this;
            this.setContext(route);
            this.loader.loading = true;
            this.resourceLoading = this.resourceLoaded = this.formio
                .loadSubmission(null, { ignoreCache: true })
                .then((/**
             * @param {?} resource
             * @return {?}
             */
            function (resource) {
                _this.resource = resource;
                _this.loader.loading = false;
                _this.refresh.emit({
                    property: 'submission',
                    value: _this.resource
                });
                return resource;
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onSubmissionError(err); }))
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onSubmissionError(err); }));
            return this.resourceLoading;
        };
        /**
         * @param {?} resource
         * @return {?}
         */
        FormioResourceService.prototype.save = /**
         * @param {?} resource
         * @return {?}
         */
        function (resource) {
            var _this = this;
            /** @type {?} */
            var formio = resource._id ? this.formio : this.formFormio;
            return formio
                .saveSubmission(resource)
                .then((/**
             * @param {?} saved
             * @return {?}
             */
            function (saved) {
                _this.resource = saved;
                return saved;
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onError(err); }))
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onError(err); }));
        };
        /**
         * @return {?}
         */
        FormioResourceService.prototype.remove = /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this.formio
                .deleteSubmission()
                .then((/**
             * @return {?}
             */
            function () {
                _this.resource = null;
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onError(err); }))
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onError(err); }));
        };
        FormioResourceService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        FormioResourceService.ctorParameters = function () { return [
            { type: FormioAppConfig },
            { type: FormioResourceConfig },
            { type: FormioLoader },
            { type: FormioResources, decorators: [{ type: core.Optional }] }
        ]; };
        return FormioResourceService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormioResourceViewComponent = /** @class */ (function () {
        function FormioResourceViewComponent(service, config) {
            this.service = service;
            this.config = config;
        }
        FormioResourceViewComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<formio [form]=\"service.form\" [submission]=\"service.resource\" [refresh]=\"service.refresh\" [hideComponents]=\"config.parents\" [readOnly]=\"true\" ></formio> "
                    },] },
        ];
        /** @nocollapse */
        FormioResourceViewComponent.ctorParameters = function () { return [
            { type: FormioResourceService },
            { type: FormioResourceConfig }
        ]; };
        return FormioResourceViewComponent;
    }());

    exports.FormioResourceViewComponent = FormioResourceViewComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
