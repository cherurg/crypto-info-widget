import { BrowserModule } from '@angular/platform-browser'
import { NgModule, Injector } from '@angular/core'
import { createCustomElement } from '@angular/elements'

import { AppComponent } from './app.component'
import { UserPollComponent } from './user-poll/user-poll.component'

@NgModule({
  declarations: [AppComponent, UserPollComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UserPollComponent],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(UserPollComponent, {
      injector: this.injector,
    })

    customElements.define('user-poll', el)
  }
}
