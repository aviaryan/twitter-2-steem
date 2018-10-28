'use strict';

const postToSteem = require('./lib/steem.js')
const fetchTweet = require('./lib/twitter.js')

module.exports.twitter2steem = async (event, context, cb) => {
  // console.log(event, context)
  const data = JSON.parse(event.body)

  const content = await fetchTweet(data['tweetLink'])
  if (!content) {
    return {
      statusCode: 400,
      body: "Issue with fetching tweet content"
    }
  }
  const status = await postToSteem(content)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: status,
      input: event,
    }),
  }
};
