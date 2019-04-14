import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { MaterialDesignModule } from "../material-design.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent
    ],
    imports: [
        MaterialDesignModule,
        FormsModule,
        UserRoutingModule,
        CommonModule,
    ]
})
export class UserModule { }