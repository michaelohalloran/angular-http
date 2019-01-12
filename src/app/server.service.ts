import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})

export class ServerService {

  constructor(private http: Http) { }

  storeServers(servers: any[]) {
    const headers = new Headers({'Content-Type': 'application/json'});

    // return this.http.post('https://udemy-ng-http-4f36b.firebaseio.com/data.json', 
    //   servers, 
    //   {headers: headers});

    return this.http.put('https://udemy-ng-http-4f36b.firebaseio.com/data.json', 
      servers, 
      {headers: headers});
  }

  getServers() {
    return this.http.get('https://udemy-ng-http-4f36b.firebaseio.com/data')
      .map(
        (response: Response) => {
          const data = response.json();
          for (let server of data) {
            server.name = 'FETCHED_' + server.name;
          }
          return data;
        }
      )
      .catch(
        (error: Response) => {
          console.log('error: ', error);
          return Observable.throw('Something went wrong');
        }
      );
  }

  getAppName() {
    return this.http.get('https://udemy-ng-http-4f36b.firebaseio.com/data/appName.json')
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

}
