import { NgModule } from "@angular/core";
import {
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatMenuModule
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
        MatMenuModule
    ]
})
export class MaterialDesignModule { }