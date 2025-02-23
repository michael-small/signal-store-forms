import { ChangeDetectionStrategy, Component } from '@angular/core';
import { raw_data, transformArrayToObject, zodify } from './zod-stuff/zod-csv';
import { JsonPipe, KeyValuePipe } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-zod-example',
  imports: [KeyValuePipe, MatSelectModule, MatFormFieldModule],
  template: `
    @for (item of types; track $index) {
        @for (field of item | keyvalue; track $index) {
            <mat-form-field>
                <mat-label>{{field.key}}</mat-label>
                <mat-select>
                    @for (i of field.value | keyvalue; track $index) {
                        <mat-option>{{i.key}}</mat-option>
                    }
                </mat-select>
            </mat-form-field>
        }
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZodExampleComponent {
    types = zodify(transformArrayToObject(raw_data), ['number', 'string'])
    constructor() {
        console.log(zodify(transformArrayToObject(raw_data), ['number', 'string']))
    }
}
