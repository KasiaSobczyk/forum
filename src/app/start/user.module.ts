import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { MaterialDesignModule } from "../material-design.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserRoutingModule } from "./user-routing.module";
import { UserSpaceComponent } from "./user-space/user-space.component";

@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        UserSpaceComponent
    ],
    imports: [
        MaterialDesignModule,
        FormsModule,
        UserRoutingModule,
        CommonModule,
    ]
})
export class UserModule { }