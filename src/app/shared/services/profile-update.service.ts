import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {

  private profileUpdateSource = new Subject<string>();
  public profileUpdate$ = this.profileUpdateSource;

  constructor(private http: HttpClient) { }

  updateProfile(data, user_id) {
    return this.http.put(env.updateProfileUrl(user_id), data);
  }

  getProfileData(id) {
    return this.http.get(env.updateProfileUrl(id));
  }
}
