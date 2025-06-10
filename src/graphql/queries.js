import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchQuery: String, $first: Int, $after: String) {
      repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchQuery
      first: $first
      after: $after
) {
    edges {
      node {
        id
        fullName
        description
        language
        stargazersCount
        forksCount
        reviewCount
        ratingAverage
        ownerAvatarUrl
        
      }
        cursor
    }
        pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
  }
  }
`
export const LOGGEDIN = gql`
query getCurrentUser($includeReviews: Boolean = false) {
  me {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
         id
          text
          rating
          createdAt
          user {
              id
              username
            }
             repository {
              id
              fullName
            }


        }
      }
    }

  }
}
  `

export const GET_REPOSITORY = gql`
  query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
      url
       reviews (first: $first, after: $after){
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
          cursor
      }
            pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
    }
    }
  }
        `
  ;