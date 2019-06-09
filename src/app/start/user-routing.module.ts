import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";
import { UserSpaceComponent } from "./user-space/user-space.component";
import { RouteGuard } from "./route.guard";

const routes: Routes = [
    { path: 'register', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    // { path: ':userId', component: UserSpaceComponent, canActivate: [RouteGuard] }
    { path: ':userId', component: UserSpaceComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    // providers: [RouteGuard]
})
export class UserRoutingModule { }