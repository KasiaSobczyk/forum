import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loader = false;
  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    // console.log(form.value)
    if(form.invalid){
      return
    }
    this.userService.loginMember(form.value.email, form.value.password);
  }
}
