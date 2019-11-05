import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
const getToken = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
}

const client = new ApolloClient({
  uri: 'https://jordans-hackernews.herokuapp.com/',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: getToken(),
      },
    });
  }
})

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
