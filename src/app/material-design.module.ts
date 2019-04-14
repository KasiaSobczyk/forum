import { NgModule } from "@angular/core";
import {
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
} from '@angular/material';

@NgModule({
    exports: [
        MatProgressSpinnerModule,
        MatInputModule,
        MatPaginatorModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatDialogModule,
        MatExpansionModule,
    ]
})
export class MaterialDesignModule { }