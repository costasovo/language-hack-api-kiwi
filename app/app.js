import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  applyRouterMiddleware,
} from 'react-router';
import AppLoading from './components/AppLoading';
import App from './containers/App';
import Dashboard from './containers/Dashboard';
import {
  setRelayNetworkLayer,
} from './utils';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';

setRelayNetworkLayer();

const DashboardQueries = {
  viewer: () => Relay.QL`query { viewer }`,
};

let previousAppProps = null;

function renderAppRoute({ done, props, element }) {
  if (done) {
    previousAppProps = props;
    return React.cloneElement(element, { ...props, loading: false });
  }
  // By rendering this route with the previous props the UI shows the same view
  // until it's finished fetching the new data.
  if (previousAppProps) {
    return React.cloneElement(element, { ...previousAppProps, loading: true });
  }

  return <AppLoading />;
}

function graphQLFetcher(graphQLParams) {
  return fetch('/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

ReactDOM.render(
  <GraphiQL fetcher={graphQLFetcher} />,
  document.getElementById('root')
);
