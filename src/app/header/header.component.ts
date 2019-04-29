import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../start/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public existUser = false;
  public username: string;
  private statusListener: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.username = this.userService.getUserName();
    this.existUser = this.userService.getAuth();
    this.statusListener = this.userService.getStatus().subscribe(auth => {
      this.existUser = auth;
      this.username = this.userService.getUserName();
    });
  }

  ngOnDestroy() {
    this.statusListener.unsubscribe();
  }

  onLogoff() {
    this.userService.disconecctMember();
  }
}
