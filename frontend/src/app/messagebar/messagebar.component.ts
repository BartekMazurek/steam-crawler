import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-messagebar',
  templateUrl: './messagebar.component.html',
  styleUrls: ['./messagebar.component.css']
})
export class MessagebarComponent implements OnInit {

  @Input() refreshStatus: string;

  constructor() { }

  ngOnInit() {
  }
}
