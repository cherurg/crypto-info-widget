import { BrowserModule } from '@angular/platform-browser'
import { NgModule, Injector } from '@angular/core'
import { createCustomElement } from '@angular/elements'

import { AppComponent } from './app.component'
import { DailyActiveAdressesComponent } from './daily-active-adresses/daily-active-adresses.component'

@NgModule({
  declarations: [AppComponent, DailyActiveAdressesComponent],
  imports: [BrowserModule],
  providers: [],
  entryComponents: [DailyActiveAdressesComponent],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(DailyActiveAdressesComponent, {
      injector: this.injector,
    })

    customElements.define('daily-active-adresses', el)
  }
}
