import React, { Component } from 'react'
import { ApolloProvider, Query } from 'react-apollo'
import client from './client'
import { SEARCH_REPOSITORYS } from './graphql'

const DEFAULT_STATE = {
  after: null,
  before: null,
  first: 5,
  last: null,
  query: "フロントエンドエンジニア"
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      ...DEFAULT_STATE,
      query: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
  }
  render() {
    const { query, first, last, before, after } = this.state
    return (
      <ApolloProvider client={client}>
        <form onSubmit={this.handleSubmit}>
          <input value={query} onChange={this.handleChange} />
        </form>

        <Query query={SEARCH_REPOSITORYS} variables={{ query, first, last, before, after }}>
          {
            ({ loading, error, data }) => {
              if (loading) return 'Loading...'
              if (error) return `Error! ${error.message}`

              const search = data.search
              const repositoryCount = search.repositoryCount
              const repositoryUnit = repositoryCount === 1 ? 'Repository' : 'Repositories'
              const title = `GitHub Repositories Search Result  - ${repositoryCount} ${repositoryUnit}`
              return (
                <>
                  <h2>{title}</h2>
                  <ul>
                    {
                      search.edges.map(edges => {
                        const node = edges.node

                        return (
                          <li key={node.id}>
                            <a href={node.url} target="_blank" rel="noopener noreferrer">{node.name}</a>
                          </li>
                        )
                      })
                    }

                  </ul>
                </>
              )
            }
          }
        </Query>
      </ApolloProvider>
    )
  }
}

export default App
