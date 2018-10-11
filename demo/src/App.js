import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import logo from './logo.svg';
import './App.css';
import InteractionTable from './components/InteractionTable';

const client = new ApolloClient({
  uri: "/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h2>My first Apollo app 🚀</h2>
          <InteractionTable />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
