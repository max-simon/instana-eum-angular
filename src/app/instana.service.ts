import { Injectable } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';

export interface InstanaEventData {
  duration?: number,
  timestamp?: number,
  backendTraceId?: string,
  error?: Error,
  componentStack?: string,
  meta?: {
    [key: string]: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class InstanaService {

  constructor(private router: Router) {}

  public pageLoggingActive: boolean = false;
  public userLoggingActive: boolean = false;
  public sessionTrackingActive: boolean = false;

  public currentPageLoad: {path: string, id?: string} = {path: ''};

  public logPageTransitions() {
    // see https://www.ibm.com/docs/en/obi/current?topic=websites-javascript-agent-api#page
    console.debug('InstanaService :: will push page transitions to Instana');

    // only initialize once
    if(this.pageLoggingActive) {
      return;
    }
    this.pageLoggingActive = true;

    /**
     * We do not want to push the URL to Instana but rather
     * the path config (smth like /product/:productId) because
     * Instana can then group all calls to this path.
     * The path config is not available in NavigationEnd event of router, therefore we need
     * to store the path config in ActivationEnd to have it available in NavigationEnd.
     */
    let pageName: string | undefined;
    this.router.events.subscribe(event => {
      // save path config for use in NavigationEnd
      if(event instanceof ActivationEnd) {
        // TODO: this does not work with child routes, because `path` will only be the toplevel path config
        pageName = event.snapshot.routeConfig?.path;
      }
      // push page transition to instana backend
      if(event instanceof NavigationEnd && pageName) {
        console.debug('InstanaService :: push page transition to', pageName);
        ineum('page', pageName);
        // below this only for debugging
        this.currentPageLoad = {
          path: pageName,
          id: ineum('getPageLoadId')
        };
      }
    })
  }

  public setUser(userId: string | undefined, userName: string | undefined = undefined, userEmail: string | undefined = undefined) {
    // see https://www.ibm.com/docs/en/obi/current?topic=websites-javascript-agent-api#identifying-users
    console.debug("InstanaService :: will set user information", userId, userName, userEmail);
    console.warn("ATTENTION: make sure that the collection of user information is GDPR compliant");

    // check if session tracking is active
    if(this.sessionTrackingActive) {
      console.warn("InstanaService :: setting user information makes tracking sessions obsolete");
    }

    this.userLoggingActive = true;

    ineum('user', userId, userName, userEmail);
  }

  public trackSession() {
    // see https://www.ibm.com/docs/en/obi/current?topic=websites-javascript-agent-api#session-tracking
    console.debug("InstanaService :: will track sessions");
    console.warn("ATTENTION: make sure that the collection of user information is GDPR compliant");

    // check if user logging is active
    if(this.userLoggingActive) {
      console.warn("InstanaService :: user information already set, this makes tracking sessions obsolete");
    }

    this.sessionTrackingActive = true;

    ineum('trackSessions');
  }

  public terminateSession() {
    // see https://www.ibm.com/docs/en/obi/current?topic=websites-javascript-agent-api#terminate-session
    console.debug("InstanaService :: will terminate sessions");
    this.sessionTrackingActive = false;
    ineum('terminateSession');
  }

  public setMetadata(metadata: {[key: string]: string}) {
    // see https://www.ibm.com/docs/en/obi/current?topic=websites-javascript-agent-api#metadata
    console.debug('InstanaService :: send metadata', metadata);
    Object.keys(metadata).map(key => {
      ineum('meta', key, metadata[key]);
    })
  }

  public reportEvent(eventName: string, eventData: InstanaEventData) {
    // see https://www.ibm.com/docs/en/obi/current?topic=websites-javascript-agent-api#reporting-custom-events
    console.debug('InstanaService :: send event', eventName, eventData);
    ineum('reportEvent', eventName, eventData);
  }

}
