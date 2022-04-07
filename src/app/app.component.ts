import { Component, OnInit } from '@angular/core';
import { InstanaService } from './instana.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'instana-eum';

  constructor(private instana: InstanaService) {}

  ngOnInit() {
    // activate logging of page transitions
    this.instana.logPageTransitions();
  }

}
