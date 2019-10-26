/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormioAuthService } from '../auth/auth.service';
import { FormioResourceService } from './resource.service';
var FormioResourceComponent = /** @class */ (function () {
    function FormioResourceComponent(service, route, auth) {
        this.service = service;
        this.route = route;
        this.auth = auth;
        this.perms = { delete: false, edit: false };
    }
    /**
     * @return {?}
     */
    FormioResourceComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.service.loadResource(this.route);
        this.service.formLoaded.then((/**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            _this.auth.ready.then((/**
             * @return {?}
             */
            function () {
                _this.service.resourceLoaded.then((/**
                 * @param {?} resource
                 * @return {?}
                 */
                function (resource) {
                    _this.service.formFormio.userPermissions(_this.auth.user, form, resource).then((/**
                     * @param {?} perms
                     * @return {?}
                     */
                    function (perms) {
                        _this.perms.delete = perms.delete;
                        _this.perms.edit = perms.edit;
                    }));
                }));
            }));
        }));
    };
    FormioResourceComponent.decorators = [
        { type: Component, args: [{
                    template: "<ul class=\"nav nav-tabs\" style=\"margin-bottom: 10px\"> <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"../\"><i class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></i></a></li> <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"view\" routerLinkActive=\"active\">View</a></li> <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"perms.edit\"><a class=\"nav-link\" routerLink=\"edit\" routerLinkActive=\"active\">Edit</a></li> <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"perms.delete\"><a class=\"nav-link\" routerLink=\"delete\" routerLinkActive=\"active\"><span class=\"fa fa-trash glyphicon glyphicon-trash\"></span></a></li> </ul> <router-outlet></router-outlet> "
                },] },
    ];
    /** @nocollapse */
    FormioResourceComponent.ctorParameters = function () { return [
        { type: FormioResourceService },
        { type: ActivatedRoute },
        { type: FormioAuthService }
    ]; };
    return FormioResourceComponent;
}());
export { FormioResourceComponent };
if (false) {
    /** @type {?} */
    FormioResourceComponent.prototype.perms;
    /** @type {?} */
    FormioResourceComponent.prototype.service;
    /** @type {?} */
    FormioResourceComponent.prototype.route;
    /** @type {?} */
    FormioResourceComponent.prototype.auth;
}
