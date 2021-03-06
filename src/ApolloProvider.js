import React from 'react';
import App from './App';
import {ApolloClient, InMemoryCache,ApolloProvider,createHttpLink,ApolloLink} from '@apollo/client';
//import { createHttpLink } from 'apollo-link-http';
import { onError } from "@apollo/client/link/error";
import {setContext} from 'apollo-link-context';
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }

    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
});
const httpLink = createHttpLink({
    uri: 'https://shielded-headland-04220.herokuapp.com/',
}  
)

const authLink = setContext((_,{headers}) =>{
    const token = localStorage.getItem('jwtToken')
      return{
          headers:{
              ...headers,
              authorization: token? `Bearer ${token}`:''
          }
      }
})
const link = ApolloLink.from([errorLink,authLink,httpLink])
const client = new ApolloClient({
   link: link,
   /*link: ApolloLink.from([
       new HttpLink({uri: 'http://localhost:5000'}),
       errorLink
   ]),*/
   cache: new InMemoryCache()
});



export default(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
);