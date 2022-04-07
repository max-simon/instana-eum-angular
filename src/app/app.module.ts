import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionCenterComponent } from './action-center/action-center.component';
import { FormsModule } from '@angular/forms';
import { MetaDataComponent } from './meta-data/meta-data.component';

class InstanaErrorHandler implements ErrorHandler {
  handleError(error: Error) {
    ineum('reportError', error);
    console.error(error);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ActionCenterComponent,
    MetaDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{
    provide: ErrorHandler, useClass: InstanaErrorHandler
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
