import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserCollectService {

  constructor(private http: HttpClient) { }

  submitData(id, userData){
  return this.http.post(env.apiUrl.userDataUrl(id), userData);
    }
}
