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
  ): Observable<
    ApolloQueryResult<{
      dailyActiveAddresses: ActiveAdressesPiece[]
    }>
  > {
    return this.apollo.query<{
      dailyActiveAddresses: ActiveAdressesPiece[]
    }>({
      query: gql`
        query DailyActiveAdresses($ticker: String!) {
          dailyActiveAddresses(
            ticker: $ticker
            from: "2018-06-01 16:00:00Z"
            to: "2018-06-05 16:00:00Z"
            interval: "1d"
          ) {
            activeAddresses
            datetime
          }
        }
      `,
      variables: {
        ticker,
      },
    })
  }
}
