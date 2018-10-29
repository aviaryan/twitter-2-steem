const Twit = require('twit')

let T = new Twit({
	consumer_key: process.env.TW_C_K,
	consumer_secret: process.env.TW_C_S,
	access_token: process.env.TW_A_T,
	access_token_secret: process.env.TW_A_S,
	timeout_ms: 60 * 1000,
})

const format = `
$text

-----

<center>
<a href="https://github.com/aviaryan/twitter-2-steem">Auto-Posted</a> from <a href="$tl">Twitter</a>, follow <a href="https://twitter.com/aviaryan123">@aviaryan123</a> to learn more
</center>
`

// given the tweet link returns the content
module.exports = function(tweetLink) {
	return new Promise((resolve, reject) => {
		const lastSlash = tweetLink.lastIndexOf('/')
		const tweetID = tweetLink.substr(lastSlash + 1)
		console.log(tweetID)
		T.get('statuses/show/:id', { id: tweetID, tweet_mode: 'extended' }, (err, data, resp) => {
			if (err) {
				return reject(err)
			}
			// TODO: remove when lambda is secret
			if (data['user']['screen_name'] !== 'aviaryan123') {
				return reject('wrong twitter user')
			}
			const tweetText = data.full_text.replace(/@[a-zA-Z0-9_]+/gi, function (x) {
				return `<a href="https://twitter.com/${x.substr(1)}">${x}</a>`;
			});
			let out = format.replace('$tl', tweetLink.replace('http://', 'https://').trim()).replace('$text', tweetText)
			resolve(out)
		})
	})
}
