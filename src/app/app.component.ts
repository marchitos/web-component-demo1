import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Infocert';
  jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJhbGVzc2FuZHJvIiwiZXhwIjoxNjA2MTQ5MTU2fQ.9KnxtyD8LHhJRqyq5HJH01XQxYGpO_W6S_ShEjMmliY';
  ngOnInit() {
  }
  vivochaEvent(evt) {
    if (evt && evt.detail) {
      const ev = evt.detail;
      console.log('VVC-WC', ev);
    }
  }
}
