(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('formiojs'), require('lodash')) :
    typeof define === 'function' && define.amd ? define('gridBodyComponent', ['exports', '@angular/core', 'formiojs', 'lodash'], factory) :
    (global = global || self, factory(global['formio-grid'] = {}, global.core, global.formiojs, global.lodash));
}(this, function (exports, core, formiojs, lodash) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var GridHeaderComponent = /** @class */ (function () {
        function GridHeaderComponent() {
            this.headers = [];
            this.sort = new core.EventEmitter();
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
            actionAllowed: [{ type: core.Input }],
            sort: [{ type: core.Output }],
            template: [{ type: core.ViewChild, args: [core.TemplateRef, { static: true },] }]
        };
        return GridHeaderComponent;
    }());

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var SubmissionGridHeaderComponent = /** @class */ (function (_super) {
        __extends(SubmissionGridHeaderComponent, _super);
        function SubmissionGridHeaderComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} formio
         * @param {?=} query
         * @return {?}
         */
        SubmissionGridHeaderComponent.prototype.load = /**
         * @param {?} formio
         * @param {?=} query
         * @return {?}
         */
        function (formio, query) {
            var _this = this;
            query = query || {};
            return formio.loadForm({ params: query }).then((/**
             * @param {?} form
             * @return {?}
             */
            function (form) {
                _this.headers = [];
                formiojs.Utils.eachComponent(form.components, (/**
                 * @param {?} component
                 * @return {?}
                 */
                function (component) {
                    if (component.input && component.tableView) {
                        _this.headers.push({
                            label: component.label,
                            key: 'data.' + component.key,
                            sort: '',
                            component: formiojs.Components.create(component, null, null, true)
                        });
                    }
                }), true);
                return _this.headers;
            }));
        };
        SubmissionGridHeaderComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<ng-template> <thead> <tr> <th *ngFor=\"let header of headers\"> <a (click)=\"sort.emit(header)\"> {{ header.label }}&nbsp;<span [ngClass]=\"{'glyphicon-triangle-top': (header.sort === 'asc'), 'glyphicon-triangle-bottom': (header.sort === 'desc')}\" class=\"glyphicon\" *ngIf=\"header.sort\"></span> </a> </th> </tr> </thead> </ng-template> "
                    },] },
        ];
        return SubmissionGridHeaderComponent;
    }(GridHeaderComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var GridBodyComponent = /** @class */ (function () {
        function GridBodyComponent() {
            this.firstItem = 0;
            this.lastItem = 0;
            this.skip = 0;
            this.limit = 0;
            this.total = 0;
            this.rowSelect = new core.EventEmitter();
            this.rowAction = new core.EventEmitter();
            this.loading = true;
        }
        /**
         * @param {?} formio
         * @param {?=} query
         * @return {?}
         */
        GridBodyComponent.prototype.load = /**
         * @param {?} formio
         * @param {?=} query
         * @return {?}
         */
        function (formio, query) {
            return Promise.resolve({});
        };
        /**
         * @param {?} event
         * @param {?} row
         * @return {?}
         */
        GridBodyComponent.prototype.onRowSelect = /**
         * @param {?} event
         * @param {?} row
         * @return {?}
         */
        function (event, row) {
            event.preventDefault();
            this.rowSelect.emit(row);
        };
        /**
         * @param {?} event
         * @param {?} row
         * @param {?} action
         * @return {?}
         */
        GridBodyComponent.prototype.onRowAction = /**
         * @param {?} event
         * @param {?} row
         * @param {?} action
         * @return {?}
         */
        function (event, row, action) {
            event.preventDefault();
            this.rowAction.emit({ row: row, action: action });
        };
        /**
         * Set the rows for this Grid body.
         *
         * @param query
         * @param items
         * @return any
         */
        /**
         * Set the rows for this Grid body.
         *
         * @param {?} query
         * @param {?} items
         * @return {?} any
         */
        GridBodyComponent.prototype.setRows = /**
         * Set the rows for this Grid body.
         *
         * @param {?} query
         * @param {?} items
         * @return {?} any
         */
        function (query, items) {
            var _this = this;
            this.rows = [];
            this.firstItem = query.skip + 1;
            this.lastItem = this.firstItem + items.length - 1;
            this.total = items.serverCount;
            this.limit = query.limit;
            this.skip = Math.floor(items.skip / query.limit) + 1;
            this.loading = false;
            lodash.each(items, (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                _this.rows.push(lodash.clone(item));
            }));
            return this.rows;
        };
        GridBodyComponent.propDecorators = {
            header: [{ type: core.Input }],
            actionAllowed: [{ type: core.Input }],
            rowSelect: [{ type: core.Output }],
            rowAction: [{ type: core.Output }],
            template: [{ type: core.ViewChild, args: [core.TemplateRef, { static: true },] }]
        };
        return GridBodyComponent;
    }());

    var __extends$1 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var SubmissionGridBodyComponent = /** @class */ (function (_super) {
        __extends$1(SubmissionGridBodyComponent, _super);
        function SubmissionGridBodyComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} formio
         * @param {?=} query
         * @return {?}
         */
        SubmissionGridBodyComponent.prototype.load = /**
         * @param {?} formio
         * @param {?=} query
         * @return {?}
         */
        function (formio, query) {
            var _this = this;
            query = query || {};
            return formio.loadSubmissions({ params: query })
                .then((/**
             * @param {?} submissions
             * @return {?}
             */
            function (submissions) { return _this.setRows(query, submissions); }));
        };
        /**
         * Render the cell data.
         *
         * @param row
         * @param header
         * @return any
         */
        /**
         * Render the cell data.
         *
         * @param {?} row
         * @param {?} header
         * @return {?} any
         */
        SubmissionGridBodyComponent.prototype.view = /**
         * Render the cell data.
         *
         * @param {?} row
         * @param {?} header
         * @return {?} any
         */
        function (row, header) {
            /** @type {?} */
            var cellValue = lodash.get(row, header.key);
            if (typeof header.component.getView === 'function') {
                return header.component.getView(cellValue);
            }
            return header.component.asString(cellValue);
        };
        SubmissionGridBodyComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<ng-template> <tbody> <tr *ngFor=\"let row of rows\" (click)=\"onRowSelect($event, row)\"> <td *ngFor=\"let rowHeader of header.headers\" [innerHTML]=\"view(row, rowHeader)\"></td> </tr> </tbody> </ng-template> "
                    },] },
        ];
        return SubmissionGridBodyComponent;
    }(GridBodyComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var GridFooterComponent = /** @class */ (function () {
        function GridFooterComponent() {
            this.pageChanged = new core.EventEmitter();
            this.createItem = new core.EventEmitter();
        }
        GridFooterComponent.propDecorators = {
            header: [{ type: core.Input }],
            body: [{ type: core.Input }],
            createText: [{ type: core.Input }],
            size: [{ type: core.Input }],
            actionAllowed: [{ type: core.Input }],
            pageChanged: [{ type: core.Output }],
            createItem: [{ type: core.Output }],
            template: [{ type: core.ViewChild, args: [core.TemplateRef, { static: true },] }]
        };
        return GridFooterComponent;
    }());

    var __extends$2 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var SubmissionGridFooterComponent = /** @class */ (function (_super) {
        __extends$2(SubmissionGridFooterComponent, _super);
        function SubmissionGridFooterComponent() {
            return _super.call(this) || this;
        }
        /**
         * @return {?}
         */
        SubmissionGridFooterComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            if (!this.size) {
                this.size = 7;
            }
        };
        SubmissionGridFooterComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<ng-template> <tfoot class=\"formio-grid-footer\"> <tr> <td *ngIf=\"header\" [colSpan]=\"header.numHeaders\"> <button *ngIf=\"actionAllowed('submissionCreate') && createText\" class=\"btn btn-primary pull-left float-left\" (click)=\"createItem.emit('form')\"><i class=\"glyphicon glyphicon-plus fa fa-plus\"></i> {{ createText }}</button> <span class=\"pull-right float-right item-counter\"><span class=\"page-num\">{{ body.firstItem }} - {{ body.lastItem }}</span> / {{ body.total }} total</span> <pagination [totalItems]=\"body.total\" [itemsPerPage]=\"body.limit\" [(ngModel)]=\"body.skip\" (pageChanged)=\"pageChanged.emit($event)\" [maxSize]=\"size\" class=\"justify-content-center pagination-sm\"></pagination> </td> </tr> </tfoot> </ng-template> ",
                        styles: ["tfoot.formio-grid-footer td { padding: 0.3rem; } tfoot.formio-grid-footer .page-num { font-size: 1.4em; } tfoot.formio-grid-footer ul.pagination { margin-top: 5px; margin-bottom: 0; } "],
                        encapsulation: core.ViewEncapsulation.None
                    },] },
        ];
        /** @nocollapse */
        SubmissionGridFooterComponent.ctorParameters = function () { return []; };
        return SubmissionGridFooterComponent;
    }(GridFooterComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var index = {
        header: SubmissionGridHeaderComponent,
        body: SubmissionGridBodyComponent,
        footer: SubmissionGridFooterComponent
    };

    exports.default = index;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
