import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { AuthResponse } from '../auth-response';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user=new Subject<User>();
 url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDucU20Sph_SrJseWuUQPwjyhh26ta_pZI"
 url2="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDucU20Sph_SrJseWuUQPwjyhh26ta_pZI"
  constructor(private http:HttpClient) { }
  signUp(email:string,password:string){
    return this.http.post<AuthResponse>(this.url,{
      email:email,
      password:password,
      returnSecureToken: true 
    }).pipe(tap(response=>{
      const expirationDate=new Date(new Date().getTime()+Number(response.expiresIn)*1000)
      const user=new User(
        response.email,
        response.localId,
        response.idToken,
        expirationDate
      )
      this.user.next(user)
    }))
  }
  Login(email:string,password:string){
    return this.http.post<AuthResponse>(this.url2,{
      email:email,
      password:password,
      returnSecureToken: true
    }).pipe(tap(response=>{
      const expirationDate=new Date(new Date().getTime()+Number(response.expiresIn)*1000)
      const user=new User(
        response.email,
        response.localId,
        response.idToken,
        expirationDate
      )
      this.user.next(user)
    }))
  }


}
