import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default class ClassName extends React.Component {
  render() {
    return (
      <Query
        query={gql`
          {
            GeneByPrimaryKey(primaryKey: "MGI:104662") {
              interactions(first: 2) {
                primaryKey
                interactorA {
                  symbol
                }
                interactorB {
                  symbol
                }
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :</p>;
          return data.GeneByPrimaryKey.interactions.map(({
            primaryKey,
            interactorA,
            interactorB,
          }) => (
            <div key={primaryKey}>
              <p>{interactorA.symbol}</p>
              <p>{interactorB.symbol}</p>
            </div>
          ));
        }}
      </Query>
    )
  }
}
