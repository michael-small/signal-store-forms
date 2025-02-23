import { Component, effect, inject, viewChild } from '@angular/core';
import { BooksStore } from './template-driven-form.store';
import { JsonPipe } from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { tap } from 'rxjs';
import { patchState } from '@ngrx/signals';
import { ReactiveFormStore } from './reactive-forms.store';
import { ReactiveFormsArrayComponent } from "./reactive-forms-array.component";
import { FormEventsProfilerTestComponent } from "./form-events-profiler-test.component";
import { ProfilerSingularEventsComponent } from "./profiler-singular-events.component";
import { WithFormDataFeatureComponent } from "./with-form-data-feature.component";
import { ArrayOfChildrenComponent } from "./data-store-test/array-of-children.component";
import { ZodExampleComponent } from "./zod-example.component";

@Component({
  selector: 'app-root',
  imports: [ZodExampleComponent],
  template: `
  <app-zod-example />
  `
})
export class AppComponent {
    bookStore = inject(BooksStore)

    form = this.bookStore.form;

    // formData = viewChild.required<NgForm>('myForm');

    // syncNgFormMetadataEffect = effect(() => {
    //     this.formData().form.events.pipe(
    //         tap(() => {
    //             console.log(this.formData().form)
    //         })
    //     ).subscribe()

    //     this.formData().form.statusChanges.pipe(
    //         tap((s) => {
    //             const _valid = s === 'VALID';
    //             this.bookStore.setValidity(_valid)
    //         })
    //     ).subscribe()
    // })

    reactiveStore = inject(ReactiveFormStore)
    reactiveForm = this.reactiveStore.form;
}
