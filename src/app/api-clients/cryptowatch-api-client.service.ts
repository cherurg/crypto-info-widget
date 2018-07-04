import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export type CloseTime = number
export type OpenPrice = number
export type HighPrice = number
export type LowPrice = number
export type ClosePrice = number
export type Volume = number

export interface Ohlc {
  result: {
    [period: string]: [
      CloseTime,
      OpenPrice,
      HighPrice,
      LowPrice,
      ClosePrice,
      Volume
    ]
  }
}

@Injectable({
  providedIn: 'root',
})
export class CryptowatchApiClientService {
  constructor(private http: HttpClient) {}

  getOhlc(
    pair: string,
    exchange: string,
    periods: number[] = [86400],
  ): Observable<Ohlc> {
    let periodsString = periods.join(',')
    return this.http.get<Ohlc>(
      `https://api.cryptowat.ch/markets/${exchange}/${pair}/ohlc?periods=${periodsString}`,
    )
  }
}
