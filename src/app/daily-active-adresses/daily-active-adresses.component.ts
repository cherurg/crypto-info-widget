import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core'
import {
  ActiveAdressesPiece,
  SantimentApiClientService,
} from '../api-clients/santiment-api-client.service'

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

  constructor(
    private santimentApi: SantimentApiClientService,
    private zone: NgZone,
  ) {}

  ngOnInit() {
    this.santimentApi.queryDailyActiveAdresses(this.ticker).subscribe(data => {
      this.zone.run(() => {
        this.dailyActiveAdressesData = data.data.dailyActiveAddresses

        console.log(this.dailyActiveAdressesData)
      })
    }, error => (this.dailyActiveAdressesError = error))
  }
}
