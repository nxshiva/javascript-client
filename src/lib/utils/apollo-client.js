import { InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_APOLLO_GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('Token');

  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_APOLLO_SUBSCRIPTION_URI,
  options: {
    reconnect: true,
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
});

export default client;
