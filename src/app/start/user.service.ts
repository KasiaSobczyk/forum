import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from './user-data.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private logStatus = new Subject<boolean>();
  private jwt: string;

  constructor(private httpClient: HttpClient) { }

  getUserToken(){
    return this.jwt;
  }

  getStatus(){
    return this.logStatus.asObservable();
  }

  createMember(email: string, password: string) {
    const memberData: UserData = { email: email, password: password };
    this.httpClient.post('http://localhost:3000/api/user/register', memberData).subscribe( res => {
      console.log(res)
    });
  }

  loginMember(email: string, password: string){
    const memberData: UserData = { email: email, password: password };
    this.httpClient.post<{token: string}>('http://localhost:3000/api/user/login', memberData).subscribe( res => {
      const token = res.token;
      this.jwt = token;
      this.logStatus.next(true);
    });
  }
}
