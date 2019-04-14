import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from './user-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private logStatus = new Subject<boolean>();
  private jwt: string;
  private isLoggedUser = false;
  // private timeExpire: NodeJS.Timer;
  private timeExpire: any;
  private id: string;

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

  createMember(email: string, password: string) {
    const memberData: UserData = { email: email, password: password };
    this.httpClient.post('http://localhost:3000/api/user/register', memberData).subscribe(() => {
      this.router.navigate['/'];
    }, err => {
      this.logStatus.next(false);
    }); 
  }

  loginMember(email: string, password: string) {
    const memberData: UserData = { email: email, password: password };
    this.httpClient.post<{ token: string, expiresIn: number, memberId: string }>('http://localhost:3000/api/user/login', memberData).subscribe(res => {
      const token = res.token;
      this.jwt = token;
      if (token) {
        const duration = res.expiresIn;
        // console.log(duration)
        this.setDuration(duration);
        this.isLoggedUser = true;
        this.id = res.memberId;
        this.logStatus.next(true);
        const time = new Date();
        const expDate = new Date(time.getTime() + duration * 1000);
        console.log(expDate)
        this.sessionStorage(token, expDate, this.id);
        this.router.navigate(['/']);
      }
    }, err => {
      this.logStatus.next(false);
    });
  }
  

  disconecctMember() {
    this.isLoggedUser = false;
    this.jwt = null;
    this.logStatus.next(false);
    this.id = null;
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
      this.id = userInfo.memberId;
      this.setDuration(timeToExpire / 1000);
      this.logStatus.next(true);
    }
  }

  private getUserData() {
    const expirationDate = localStorage.getItem('expiration');
    const token = localStorage.getItem('token');
    const memberId = localStorage.getItem('memberId');

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      memberId: memberId
    }
  }

  private setDuration(timer: number) {
    this.timeExpire = setTimeout(() => {
      this.disconecctMember();
    }, timer * 1000);
  }

  private sessionStorage(token: string, expirationDate: Date, memberId: string ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('memberId', memberId);
  }

  private removeSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('memberId');
  }

  getMemberId(){
    return this.id;
  }
}
