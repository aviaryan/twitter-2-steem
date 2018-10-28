'use strict';

const postToSteem = require('./lib/steem.js')

module.exports.twitter2steem = async (event, context, cb) => {
  console.log('tesss')
  const status = await postToSteem('', 'some test content that goes from twitter to steeem');

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: status,
      input: event,
    }),
  }
};
