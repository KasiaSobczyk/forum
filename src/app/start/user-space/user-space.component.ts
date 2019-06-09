import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-space',
  templateUrl: './user-space.component.html',
  styleUrls: ['./user-space.component.css']
})
export class UserSpaceComponent implements OnInit {
  firstName: string;
  lastName: string;
  username: string;
  memberId: string;
  email: string;
  loader = false;

  constructor(private userService: UserService,public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.memberId = paramMap.get('userId');
        this.loader = true;
        this.userService.getUserInfo(this.memberId).subscribe( res => {
          console.log(res)
          this.firstName = res.firstName;
          this.lastName = res.lastName;
          this.username = res.username;
          this.email = res.email;
          this.loader = false;
        });
      }
    });

  }

}
