import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './start/login/login.component';
import { RegistrationComponent } from './start/registration/registration.component';
import { RouteGuard } from './start/route.guard';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canActivate: [RouteGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [RouteGuard] },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutingModule { }
