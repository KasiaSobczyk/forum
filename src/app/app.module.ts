import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { UserInterceptor } from './start/user-interceptor';
import { MisstepInterceptor } from './misstep-interceptor';
import { MisstepComponent } from './misstep/misstep.component';
import { MaterialDesignModule } from './material-design.module';
import { PostModule } from './posts/post.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MisstepComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialDesignModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    PostModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MisstepInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [MisstepComponent]
})
export class AppModule { }
