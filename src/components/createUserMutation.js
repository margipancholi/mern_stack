import { ApolloSandbox } from "@apollo/sandbox/react";

export function createUser() {
  return (
    <ApolloSandbox
      initialEndpoint="http://localhost:4000/graphql"
      initialState={{
        document: `mutation CreateEmployee {
  createEmployee {
    firstName
    lastName
    dateOfJoining
    designation
    department
    employeeType
    currentStatus
  } 
}`,
        variables: {},
        headers: {},
      }}
      includeCookies={false}
    />
  );
}
