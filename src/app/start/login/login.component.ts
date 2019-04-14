import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loader = false;
  userStatus: Subscription;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userStatus = this.userService.getStatus().subscribe(
      logStatus => {
        this.loader = false;
      }
    );
  }

  onLogin(form: NgForm) {
    // console.log(form.value)
    if(form.invalid){
      return
    }
    this.loader = true;
    this.userService.loginMember(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.userStatus.unsubscribe();
  }
}
