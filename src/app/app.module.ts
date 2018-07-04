import { HttpClientModule } from '@angular/common/http'
import { Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { BrowserModule } from '@angular/platform-browser'
import { Apollo, ApolloModule } from 'apollo-angular'
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { AppComponent } from './app.component'
import { CryptoInfoWidgetComponent } from './crypto-info-widget/crypto-info-widget.component'
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts'
import * as highstock from 'highcharts/modules/stock.src'

@NgModule({
  declarations: [AppComponent, CryptoInfoWidgetComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    ChartModule,
  ],
  providers: [
    {
      provide: HIGHCHARTS_MODULES,
      useFactory: () => [highstock],
    },
  ],
  entryComponents: [CryptoInfoWidgetComponent],
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
    const el = createCustomElement(CryptoInfoWidgetComponent, {
      injector: this.injector,
    })

    customElements.define('crypto-info-widget', el)
  }
}
