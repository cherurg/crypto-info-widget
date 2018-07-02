import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export type Time = number
export type Open = string
export type High = string
export type Low = string
export type Close = string
export type Vwap = string
export type Volume = string
export type Count = number

export type OhlcPiece = [Time, Open, High, Low, Close, Vwap, Volume, Count]

export interface Ohlc {
  [key: string]: OhlcPiece[]
}

@Injectable({
  providedIn: 'root',
})
export class KrakenApiClientService {
  constructor(private http: HttpClient) {}

  getOhlc(pair: string, interval: number = 1440): Observable<Ohlc> {
    return this.http
      .get<{ result: Ohlc }>(
        `https://api.kraken.com/0/public/OHLC?pair=${pair}&interval=${interval}`,
      )
      .pipe(map(it => it.result))
  }
}
