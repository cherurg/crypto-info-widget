import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { ApolloQueryResult } from 'apollo-client'

export interface ActiveAdressesPiece {
  activeAddresses: number
  datetime: string
}

export type TransactionVolumePiece = any

@Injectable({
  providedIn: 'root',
})
export class SantimentApiClientService {
  constructor(private apollo: Apollo) {}

  queryDailyActiveAdresses(
    slug: string,
    from: string,
    to: string,
    interval: string = '1d',
  ): Observable<
    ApolloQueryResult<{
      dailyActiveAddresses: ActiveAdressesPiece[]
      transactionVolume: TransactionVolumePiece[]
    }>
  > {
    return this.apollo.query<{
      dailyActiveAddresses: ActiveAdressesPiece[]
      transactionVolume: TransactionVolumePiece[]
    }>({
      query: gql`
        query DailyActiveAdresses(
          $slug: String!
          $interval: String!
          $from: String!
          $to: String!
        ) {
          dailyActiveAddresses(
            slug: $slug
            from: $from
            to: $to
            interval: $interval
          ) {
            activeAddresses
            datetime
          }
          transactionVolume(
            from: $from
            to: $to
            slug: $slug
            interval: $interval
          ) {
            datetime
            transactionVolume
          }
        }
      `,
      variables: {
        slug,
        interval,
        from,
        to,
      },
    })
  }
}
