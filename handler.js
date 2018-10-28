'use strict';

const postToSteem = require('./lib/steem.js')

module.exports.twitter2steem = async (event, context, cb) => {
  // console.log(event, context)
  const data = JSON.parse(event.body)

  const status = await postToSteem(data['tweetLink']);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: status,
      input: event,
    }),
  }
};
