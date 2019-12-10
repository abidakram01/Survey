import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStatePageResponse } from '../interfaces/IStatePageResponse';

import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class StaticPageService {

  constructor(private http: HttpClient) { }

  getPageContent(pageSlug): Observable<IStatePageResponse> {
    return this.http.get(env.staticPageUrl(pageSlug));
  }
}
