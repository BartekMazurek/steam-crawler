import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClearService {

  private http: HttpClient;

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  clear() {
    return this.http.get(environment.clearDbApiEndpoint);
  }
}
