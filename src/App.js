import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import ResourceList from './ResourceList';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Cloud Resources</h1>
        <ResourceList />
      </div>
    </ApolloProvider>
  );
}

export default App;