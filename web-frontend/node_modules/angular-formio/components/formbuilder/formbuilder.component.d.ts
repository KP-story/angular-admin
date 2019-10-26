import { OnChanges, OnDestroy, ElementRef, EventEmitter } from '@angular/core';
import { FormioAppConfig } from '../../formio.config';
import { FormioForm, FormioOptions } from '../../formio.common';
import { FormBuilder } from 'formiojs';
export declare class FormBuilderComponent implements OnChanges, OnDestroy {
    private config;
    ready: Promise<object>;
    readyResolve: any;
    formio: any;
    builder: FormBuilder;
    componentAdding: boolean;
    form?: FormioForm;
    options?: FormioOptions;
    formbuilder?: any;
    change?: EventEmitter<object>;
    builderElement?: ElementRef<any>;
    constructor(config: FormioAppConfig);
    setInstance(instance: any): any;
    setDisplay(display: String): any;
    buildForm(form: any): any;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
}
