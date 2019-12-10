import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ContactUsService {

  constructor(private http: HttpClient) { }

  saveContactUsData(data){
    return this.http.post(env.apiUrl.contactUsAPI, data);
  }
}
