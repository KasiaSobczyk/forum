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
    MatMenuModule,
    MatIconModule,
    MatTooltipModule
} from '@angular/material';

@NgModule({
    exports: [
        MatProgressSpinnerModule,
        MatInputModule,
        MatPaginatorModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,
        MatToolbarModule,
        MatDialogModule,
        MatExpansionModule,
        MatMenuModule,
        MatIconModule
    ]
})
export class MaterialDesignModule { }