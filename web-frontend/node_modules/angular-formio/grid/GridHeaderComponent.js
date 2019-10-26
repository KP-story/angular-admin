/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Output, EventEmitter, ViewChild, TemplateRef, Input } from '@angular/core';
var GridHeaderComponent = /** @class */ (function () {
    function GridHeaderComponent() {
        this.headers = [];
        this.sort = new EventEmitter();
    }
    Object.defineProperty(GridHeaderComponent.prototype, "numHeaders", {
        get: /**
         * @return {?}
         */
        function () {
            return this.headers.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} formio
     * @param {?=} query
     * @return {?}
     */
    GridHeaderComponent.prototype.load = /**
     * @param {?} formio
     * @param {?=} query
     * @return {?}
     */
    function (formio, query) {
        return Promise.resolve([]);
    };
    GridHeaderComponent.propDecorators = {
        actionAllowed: [{ type: Input }],
        sort: [{ type: Output }],
        template: [{ type: ViewChild, args: [TemplateRef, { static: true },] }]
    };
    return GridHeaderComponent;
}());
export { GridHeaderComponent };
if (false) {
    /** @type {?} */
    GridHeaderComponent.prototype.actionAllowed;
    /** @type {?} */
    GridHeaderComponent.prototype.sort;
    /** @type {?} */
    GridHeaderComponent.prototype.template;
    /** @type {?} */
    GridHeaderComponent.prototype.headers;
}
