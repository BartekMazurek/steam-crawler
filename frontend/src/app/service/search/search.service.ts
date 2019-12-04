import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private http: HttpClient;

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  search(searchString: string) {
    let searchForm = new FormData();
    searchForm.append('queryString', searchString);
    return this.http.post(environment.searchApiEndpoint, searchForm);
  }
}
