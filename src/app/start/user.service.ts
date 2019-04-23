import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from './user-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";

const API_URL = environment.apiUrl + '/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private logStatus = new Subject<boolean>();
  private jwt: string;
  private isLoggedUser = false;
  // private timeExpire: NodeJS.Timer;
  private timeExpire: any;
  private memberId: string;
  private username: string;

  constructor(private router: Router, private httpClient: HttpClient) { }

  getUserToken() {
    return this.jwt;
  }

  getStatus() {
    return this.logStatus.asObservable();
  }

  getAuth() {
    return this.isLoggedUser;
  }

  getMemberId() {
    return this.memberId;
  }

  getUserName() {
    return this.username;
  }

  createMember(email: string, password: string, username: string) {
    const memberData: UserData = { email: email, password: password, username: username };
    this.httpClient.post(API_URL + '/register', memberData).subscribe(() => {
      this.router.navigate(['/']);
    }, err => {
      this.logStatus.next(false);
    });
  }

  loginMember(email: string, password: string) {
    const memberData: UserData = { email: email, password: password };
    this.httpClient.post<{ token: string, expiresIn: number, memberId: string, username: string }>(API_URL + '/login', memberData).subscribe(res => {
      const token = res.token;
      this.jwt = token;
      if (token) {
        const duration = res.expiresIn;
        // console.log(duration)
        this.setDuration(duration);
        this.isLoggedUser = true;
        this.memberId = res.memberId;
        this.username = res.username;
        console.log("username " + this.username);
        this.logStatus.next(true);
        const time = new Date();
        const expDate = new Date(time.getTime() + duration * 1000);
        console.log(expDate)
        this.sessionStorage(token, expDate, this.memberId);
        this.router.navigate(['/']);
      }
    }, err => {
      this.logStatus.next(false);
    });
  }


  disconecctMember() {
    this.jwt = null;
    this.isLoggedUser = false;
    this.logStatus.next(false);
    this.memberId = null;
    clearTimeout(this.timeExpire);
    this.removeSession();
    this.router.navigate(['/']);
  }

  autoUserAuth() {
    const userInfo = this.getUserData();
    if (!userInfo) {
      return;
    }

    const currentTime = new Date();
    const timeToExpire = userInfo.expirationDate.getTime() - currentTime.getTime();

    if (timeToExpire > 0) {
      this.jwt = userInfo.token;
      this.isLoggedUser = true;
      this.memberId = userInfo.memberId;
      this.username = userInfo.username;
      this.setDuration(timeToExpire / 1000);
      this.logStatus.next(true);
    }
  }

  private getUserData() {
    const expirationDate = localStorage.getItem('expiration');
    const token = localStorage.getItem('token');
    const memberId = localStorage.getItem('memberId');
    const username = localStorage.getItem('username');

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      memberId: memberId,
      username: username
    }
  }

  private setDuration(timer: number) {
    this.timeExpire = setTimeout(() => {
      this.disconecctMember();
    }, timer * 1000);
  }

  private sessionStorage(token: string, expirationDate: Date, memberId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('memberId', memberId);
    localStorage.setItem('username', this.username);
  }

  private removeSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('memberId');
    localStorage.removeItem('username');
  }
}
