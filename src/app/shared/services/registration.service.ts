import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  registerUser(data){
    console.log('get sign up data :', data)
    return this.http.post(env.apiUrl.singup, data);
  }

  activateAccount(token) {
    return this.http.get(env.apiUrl.activateAccount + token)
  }
}
