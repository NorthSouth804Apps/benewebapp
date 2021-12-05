import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Params } from '../common/models/params.class';
import { KumulosResponse } from '../common/models/kumulosResponse.inferface';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class ApiService {
  private baseUrl = `${environment.API_URL}${environment.API_KEY}/`;
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization:
      'Basic ' + btoa(environment.API_KEY + ':' + environment.SECRET_KEY),
  });

  constructor(private http: HttpClient) {}

  public callApi<T>(endpoint: string, params: Params): Observable<T> {
    
    let token = environment.TOKEN;
    params.append('authToken', token);

    return this.http
      .post<KumulosResponse<T>>(
        this.baseUrl + endpoint,
        params.createString(),
        {
          headers: this.headers,
        }
      )
      .pipe(map((res) => res.payload.data));
  }
}