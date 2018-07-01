import { HttpClientModule } from '@angular/common/http'
import { Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { BrowserModule } from '@angular/platform-browser'
import { Apollo, ApolloModule } from 'apollo-angular'
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { AppComponent } from './app.component'
import { DailyActiveAdressesComponent } from './daily-active-adresses/daily-active-adresses.component'
import { ChartModule } from 'angular-highcharts'

@NgModule({
  declarations: [AppComponent, DailyActiveAdressesComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    ChartModule,
  ],
  providers: [],
  entryComponents: [DailyActiveAdressesComponent],
})
export class AppModule {
  constructor(private injector: Injector, apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: 'https://sanbase-low.santiment.net/graphql',
      }),
      cache: new InMemoryCache(),
    })
  }

  ngDoBootstrap() {
    const el = createCustomElement(DailyActiveAdressesComponent, {
      injector: this.injector,
    })

    customElements.define('daily-active-adresses', el)
  }
}
