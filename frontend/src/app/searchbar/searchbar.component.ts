import {Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  searchString: string;

  @Output() refresh = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string>();
  @Output() processing = new EventEmitter<boolean>();
  @Output() clear = new EventEmitter<boolean>();
  @Input() refreshStatus: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(searchForm) {
    let searchString = searchForm.form.value;
    this.search.emit(searchString.searchString);
    this.processing.emit(true);
  }

  refreshDatabase() {
    this.refresh.emit(true);
    this.processing.emit(true);
    this.clearInput();
  }

  clearDatabase() {
    this.clear.emit(true);
    this.processing.emit(true);
  }

  clearInput() {
    this.searchString = '';
  }
}
