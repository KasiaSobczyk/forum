import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  loader = false;
  private userStatus: Subscription;
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userStatus = this.userService.getStatus().subscribe(
      logStatus => {
        this.loader = false;
      }
    );
  }

  onRegister(form: NgForm) {
    // console.log(form.value)
    if (form.invalid) {
      return;
    }
    this.loader = true;
    this.userService.createMember(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    // throw new Error("Method not implemented.");
    this.userStatus.unsubscribe();
  }
}
