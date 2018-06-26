import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const Home = ({ data: { allUsers = [] } }) =>
  allUsers.map(u => {
    return (
      <div key={u.id}>
        <h1>{u.email}</h1>
      </div>
    );
  });
  

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

export default graphql(allUsersQuery)(Home);