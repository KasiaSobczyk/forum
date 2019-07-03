import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { RouteGuard } from './start/route.guard';
import { HomeComponent } from './home/home.component';
import { AboutServiceComponent } from './about-service/about-service.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canActivate: [RouteGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [RouteGuard] },
  { path: 'user', loadChildren: './start/user.module#UserModule' },
  { path: 'about', component: AboutServiceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutingModule { }
