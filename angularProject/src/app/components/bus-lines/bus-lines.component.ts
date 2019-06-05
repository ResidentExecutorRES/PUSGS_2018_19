import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-bus-lines',
  templateUrl: './bus-lines.component.html',
  styleUrls: ['./bus-lines.component.css']
})
export class BusLinesComponent implements OnInit {

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
  }

}
