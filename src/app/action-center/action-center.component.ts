import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { InstanaEventData, InstanaService } from '../instana.service';

@Component({
  selector: 'app-action-center',
  templateUrl: './action-center.component.html',
  styleUrls: ['./action-center.component.scss']
})
export class ActionCenterComponent implements OnInit {

  public globMetaData: {[key: string]: string} = {};

  constructor(public instana: InstanaService, public router: Router) { }

  ngOnInit(): void {
    
  }

  changePage(type: 'product' | 'shop') {
    const randomId = (Math.random() + 1).toString(36).substring(7);
    this.router.navigate(["/"+type+"/"+randomId])
  }

  throwError(errorMessage: string) {
    throw new Error(errorMessage);
  }
  
  setMetadata() {
    this.instana.setMetadata(this.globMetaData);
  }

  public currentEventName: string = "";
  public currentEvent: InstanaEventData = {};
  public currentEventError: boolean = false;
  public currentEventErrorMessage: string = '';
  sendEvent() {
    if(!this.currentEventName) {
      return;
    }
    if(this.currentEventError) {
      this.currentEvent.error = new Error(this.currentEventErrorMessage);
    } else {
      this.currentEvent.error = undefined;
    }
    this.instana.reportEvent(this.currentEventName, this.currentEvent);
  }

  public currentUser: {id?: string, name?: string, email?: string} = {};
  setUser() {
    this.instana.setUser(this.currentUser.id, this.currentUser.name, this.currentUser.email);
  }

}
