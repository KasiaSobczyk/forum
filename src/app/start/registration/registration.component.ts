import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  loader = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    // console.log(form.value)
    if(form.invalid){
      return;
    }
    this.userService.createMember(form.value.email, form.value.password);
  }
}
