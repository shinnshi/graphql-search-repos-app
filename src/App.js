import React, { Component } from 'react'
import { ApolloProvider, Query } from 'react-apollo'
import client from './client'
import { SEARCH_REPOSITORYS } from './graphql'

const variables = {
  after: null,
  before: null,
  first: 5,
  last: null,
  query: "フロントエンドエンジニア"
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = variables
  }
  render() {
    const { query, first, last, before, after } = this.state
    return (
      <ApolloProvider client={client}>

        <Query query={SEARCH_REPOSITORYS} variables={{ query, first, last, before, after }}>
          {
            ({ loading, error, data }) => {
              if (loading) return 'Loading...'
              if (error) return `Error! ${error.message}`
              console.log({ data })
              return <div></div>

            }
          }
        </Query>
      </ApolloProvider>
    )
  }
}

export default App
