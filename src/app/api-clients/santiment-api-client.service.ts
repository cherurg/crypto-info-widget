import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { ApolloQueryResult } from 'apollo-client'

export interface ActiveAdressesPiece {
  activeAddresses: number
  datetime: string
}

@Injectable({
  providedIn: 'root',
})
export class SantimentApiClientService {
  constructor(private apollo: Apollo) {}

  queryDailyActiveAdresses(
    ticker: string,
    from: string,
    to: string,
    interval: string = '1d',
  ): Observable<
    ApolloQueryResult<{
      dailyActiveAddresses: ActiveAdressesPiece[]
    }>
  > {
    return this.apollo.query<{
      dailyActiveAddresses: ActiveAdressesPiece[]
    }>({
      query: gql`
        query DailyActiveAdresses(
          $ticker: String!
          $interval: String!
          $from: String!
          $to: String!
        ) {
          dailyActiveAddresses(
            ticker: $ticker
            from: $from
            to: $to
            interval: $interval
          ) {
            activeAddresses
            datetime
          }
        }
      `,
      variables: {
        ticker,
        interval,
        from,
        to,
      },
    })
  }
}
