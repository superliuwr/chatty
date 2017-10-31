import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

// Initialize Apollo client
const networkInterface = createNetworkInterface({ uri: 'http://localhost:8080/graphql' });
const client = new ApolloClient({
  networkInterface,
});

// Initialize Redux store
const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  {},
  composeWithDevTools(
    applyMiddleware(client.middleware()),
  ),
);

export default class App extends Component<{}> {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
