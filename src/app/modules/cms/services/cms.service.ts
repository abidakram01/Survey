import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class CmsService {

  constructor(private http: HttpClient) { }

  createStaticPage(data: any) {
    return this.http.post(env.apiUrl.createStaticPage, data);
  }

  listStaticPages(){
    return this.http.get(env.apiUrl.listStaticPages);
  }

  getStaticPage(slug: string){
    return this.http.get(env.apiUrl.staticPageAPI + slug);
  }

  updateStaticPage(slug: string, data: any) {
    return this.http.put(env.apiUrl.staticPageAPI + slug + '/', data);
  }

  deleteStaticPage(slug: string) {
    return this.http.delete(env.apiUrl.staticPageAPI + slug);
  }

}
