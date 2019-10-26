/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { FormioAlerts } from './formio.alerts';
var FormioAlertsComponent = /** @class */ (function () {
    function FormioAlertsComponent() {
    }
    /**
     * @return {?}
     */
    FormioAlertsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.alerts) {
            this.alerts = new FormioAlerts();
        }
    };
    FormioAlertsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formio-alerts',
                    template: "<div *ngFor=\"let alert of alerts.alerts\" class=\"alert alert-{{ alert.type }}\" role=\"alert\">{{ alert.message }}</div> "
                },] },
    ];
    FormioAlertsComponent.propDecorators = {
        alerts: [{ type: Input }]
    };
    return FormioAlertsComponent;
}());
export { FormioAlertsComponent };
if (false) {
    /** @type {?} */
    FormioAlertsComponent.prototype.alerts;
}
