'use strict'; // eslint-disable-line strict

const handle = require('./graphql/index').default;

module.exports.graphql = (event, context, callback) => {
  console.log(event.body);
  handle(event.body.query, event.body.variables)
    .then((response) => callback(null, response))
    .catch((error) => callback(error));
};
