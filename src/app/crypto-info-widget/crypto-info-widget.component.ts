import {
  Component,
  Input,
  NgZone,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { StockChart } from 'angular-highcharts'
import * as Highcharts from 'highcharts'
import { capitalize } from 'lodash'
import { SantimentApiClientService } from '../api-clients/santiment-api-client.service'

@Component({
  selector: 'crypto-info-widget',
  templateUrl: './crypto-info-widget.component.html',
  styleUrls: ['./crypto-info-widget.component.css'],
  encapsulation: ViewEncapsulation.Native,
})
export class CryptoInfoWidgetComponent implements OnInit {
  @Input() slug: string
  public dailyActiveAdressesError: any
  public dailyActiveAdressesData

  public chart = new StockChart({
    rangeSelector: {
      selected: 1,
    },
    chart: {
      type: 'line',
      zoomType: 'x',
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b',
      },
      title: {
        text: 'Date',
      },
    },

    yAxis: [
      {
        title: {
          text: 'Daily Active Adresses',
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
        labels: {
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
      },
      {
        title: {
          text: 'Transaction volume',
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        labels: {
          style: {
            color: Highcharts.getOptions().colors[1],
          },
          format: '{value} ICN',
        },
      },
    ],
    legend: {
      enabled: true,
    },
    tooltip: {
      shared: true,
    },
    navigator: {
      enabled: false,
    },
  })

  constructor(
    private santimentApi: SantimentApiClientService,
    private zone: NgZone,
  ) {}

  ngOnInit() {
    if (!this.slug) {
      console.warn(
        'crypto-info-widget: you must provide "slug" propetry. E.g. <crypto-info-widget slug="iconomi"></crypto-info-widget>',
      )
      return
    }

    let now = new Date().toISOString()
    let yearAgo = new Date(Date.now() - 1000 * 24 * 3600 * 1000).toISOString()

    let daa$ = this.santimentApi.queryDailyActiveAdresses(
      this.slug,
      yearAgo,
      now,
      '1d',
    )

    daa$.subscribe(
      daa => {
        this.zone.run(() => {
          this.dailyActiveAdressesData = daa
          this.dailyActiveAdressesError = null

          this.chart.ref.setTitle({
            text: `${capitalize(this.slug)} Daily Active Adresses`,
          })

          let dailyActiveAdressesData = daa.data.dailyActiveAddresses.map(
            it => [+Date.parse(it.datetime), it.activeAddresses],
          )

          let transactionVolume = daa.data.transactionVolume.map(it => [
            +Date.parse(it.datetime),
            it.transactionVolume,
          ])

          this.chart.ref.addSeries({
            name: `${this.slug} Daily Active Adresses`,
            data: dailyActiveAdressesData as [number, number][],
            yAxis: 0,
            showInNavigator: true,
          })

          this.chart.ref.addSeries({
            name: `${this.slug} Transaction Volume`,
            data: transactionVolume as [number, number][],
            yAxis: 1,
            showInNavigator: true,
          })
        })
      },
      error => {
        console.warn(error)
        this.dailyActiveAdressesError = error
      },
    )
  }

  dataCanBeDisplayed(): boolean {
    return !!this.slug && !this.dailyActiveAdressesError
  }
}
