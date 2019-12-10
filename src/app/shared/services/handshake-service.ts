/**
 * Created by Akhtar on 15/Sep/19.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class HandshakeService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorage,
  ) { }

  /**
   * Fetches client token and lookup data and stores them in local storage.
   */
  // doHandshakeAndFetchLookups() {
  //    this.doHandshake().subscribe(
  //     (response: { lookups: any, client_token: string }) => {
  //       // Stores this in local storage
  //       if (response) {
  //         if (response) {
  //           this.localStorage.setItemSubscribe(
  //             'lookups',
  //             response
  //           );
  //           this.localStorage.setItemSubscribe(
  //             'client_token',
  //             response
  //           );
  //         }
  //       }
  //     }
  //   );
  // }

  // doHandshake() {
  //   let ClientToken = null;
  //   this.localStorage.getItem('client_token').subscribe(
  //     (fetchedData) => {
  //       if (fetchedData) {
  //         ClientToken = fetchedData;
  //       }
  //     },
  //     error => console.warn(error)
  //   );

  //   const data = {
  //     'os_version': '',
  //     'app_version': '',
  //     'app_id': '',
  //     'display_width': '',
  //     'display_height': '',
  //     'device_id': '',
  //     'device_name': '',
  //     'other_info': ''
  //   };

  //   const headers = new HttpHeaders();
  //   headers.append('Client-Token', ClientToken);
  //   return  this.http.post(env.apiUrl.handshake, data, {headers: headers});
  // }
}
