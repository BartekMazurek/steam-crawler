import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private http: HttpClient;

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  getPrice(gameId: string) {
    let gamePriceForm = new FormData();
    gamePriceForm.append('appId', gameId);
    return this.http.post(environment.priceApiEndpoint, gamePriceForm);
  }
}
