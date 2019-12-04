import { Component } from '@angular/core';
import { RefreshService } from './service/refresh/refresh.service';
import {SearchService} from './service/search/search.service';
import {ClearService} from './service/clear/clear.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public processing: boolean;
  public refreshStatus: string;
  public games: Array<object>;

  private searchService: SearchService;
  private refreshService: RefreshService;
  private clearService: ClearService;

  constructor(
    refreshService: RefreshService,
    searchService: SearchService,
    clearService: ClearService
  ) {
    this.refreshService = refreshService;
    this.searchService = searchService;
    this.clearService = clearService;
  }

  onRefresh(event) {
    if (event) {
      this.refreshService.refresh().subscribe( result => {
        this.refreshStatus = 'success';
        this.processingFinished();
      },
        error => {
        this.refreshStatus = 'error';
        this.processingFinished();
      });
    }
  }

  onSearch(event) {
    this.searchService.search(event).subscribe(result => {
      this.refreshStatus = 'show';
      this.processingFinished();
      this.setGames(result);
    }, error => {
      this.refreshStatus = 'show';
      this.processingFinished();
    });
  }

  onProcessing(event) {
    if (event) {
      this.processingInProgress();
    } else {
      this.processingFinished();
    }
  }

  onClear(event) {
    if (event) {
      this.processingInProgress();
      this.clearService.clear().subscribe(result => {
        let games = [];
        this.setGames(games);
        setTimeout(() => {
          this.refreshStatus = 'cleared';
          this.processingFinished();
        }, 1000);
      }, error => {
        setTimeout(() => {
          this.refreshStatus = 'error';
          this.processingFinished();
        }, 1000);
      });
    } else {
      this.processingFinished();
    }
  }

  setGames(games) {
    this.games = games;
  }

  processingInProgress() {
    this.processing = true;
  }

  processingFinished() {
    this.processing = false;
  }
}
