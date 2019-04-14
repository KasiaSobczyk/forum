import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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

import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './start/login/login.component';
import { RegistrationComponent } from './start/registration/registration.component';
import { UserInterceptor } from './start/user-interceptor';
import { MisstepInterceptor } from './misstep-interceptor';
import { MisstepComponent } from './misstep/misstep.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    RegistrationComponent,
    MisstepComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MisstepInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [MisstepComponent]
})
export class AppModule { }
