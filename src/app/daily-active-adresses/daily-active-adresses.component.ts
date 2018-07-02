import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core'
import {
  ActiveAdressesPiece,
  SantimentApiClientService,
} from '../api-clients/santiment-api-client.service'
import { StockChart } from 'angular-highcharts'

@Component({
  selector: 'daily-active-adresses',
  templateUrl: './daily-active-adresses.component.html',
  styleUrls: ['./daily-active-adresses.component.css'],
  encapsulation: ViewEncapsulation.Native,
})
export class DailyActiveAdressesComponent implements OnInit {
  public dailyActiveAdressesData: ActiveAdressesPiece[] = []
  public ticker = 'ICN'
  public dailyActiveAdressesError: any

  public chart = new StockChart({
    rangeSelector: {
      selected: 1,
    },
    chart: {
      type: 'line',
    },
    title: {
      text: `${this.ticker} Daily Active Adresses`,
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
  })

  constructor(
    private santimentApi: SantimentApiClientService,
    private zone: NgZone,
  ) {}

  ngOnInit() {
    let now = new Date().toISOString()
    let yearAgo = new Date(Date.now() - 1000 * 24 * 3600 * 1000).toISOString()

    this.santimentApi
      .queryDailyActiveAdresses(this.ticker, yearAgo, now, '1d')
      .subscribe(data => {
        this.zone.run(() => {
          this.dailyActiveAdressesData = data.data.dailyActiveAddresses

          let formattedData: [
            number,
            number
          ][] = this.dailyActiveAdressesData.map(
            it =>
              [+Date.parse(it.datetime), it.activeAddresses] as [
                number,
                number
              ],
          )

          this.chart.ref.addSeries({
            name: `${this.ticker} Daily Active Adresses`,
            data: formattedData,
          })
        })
      }, error => (this.dailyActiveAdressesError = error))
  }
}
