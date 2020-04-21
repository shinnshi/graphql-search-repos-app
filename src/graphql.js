import gql from 'graphql-tag'
export const SEARCH_REPOSITORYS = gql`
query searchRepositorys($after: String, $before: String, $first: Int, $last: Int, $query: String!) {
  search(after: $after, before: $before, first: $first, query: $query, last: $last type: REPOSITORY) {
    repositoryCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      cursor
      node {
        ... on Repository {
          id
          name
          url
          stargazers{
            totalCount
          }
          viewerHasStarred
        }
      }
    }
  }
}
`
export const ME = gql`
query me {
  user(login: "iteachonudemy") {
    name
    avatarUrl
  }
}
`