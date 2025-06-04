import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
   repositories {
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
    }
  }
  }
`
export const LOGGEDIN = gql`
query{
  me {
    id
    username

  }
}
  `

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
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
       reviews {
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
      }
    }
    }
  }
        `
  ;