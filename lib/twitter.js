const Twit = require('twit')
let uu = require('url-unshort')()

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

const quotedTweet = `
<blockquote>
$text
<br/><br/>
— $name (<a href="https://twitter.com/$user">@$user</a>) on <a href="$tl">$date</a>
</blockquote>
`

async function unshortenURLs(tweetText) {
	let links = tweetText.match(/https:\/\/t.co\/[a-zA-Z0-9]+/gi)
	for (let ind in links) {
		let expUrl = await uu.expand(links[ind])
		tweetText = tweetText.replace(links[ind], expUrl)
	}
	return tweetText
}

function buildQuotedTweet(data, currentText) {
	if (data['is_quote_status']) {
		let status = data['quoted_status']
		let embedded = quotedTweet.replace('$tl', data['quoted_status_permalink']['expanded'])
			.replace('$text', status.full_text.replace(/\n/g, `<br>`))
			.replace(/\$user/g, status['user']['screen_name'])
			.replace('$name', status['user']['name'])
			.replace('$date', status['created_at'])
		let body = currentText.replace(data['quoted_status_permalink']['expanded'], embedded)
		return body
	}
	return currentText
}

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
			if (data['user']['screen_name'] !== process.env.TWITTER_UN) {
				return reject('wrong twitter user')
			}
			let tweetText = data.full_text.replace(/@[a-zA-Z0-9_]+/gi, function (x) {
				return `<a href="https://twitter.com/${x.substr(1)}">${x}</a>`;
			});
			unshortenURLs(tweetText).then(tweetText => {
				let out = format.replace('$tl', tweetLink.replace('http://', 'https://').trim()).replace('$text', tweetText)
				unshortenURLs(buildQuotedTweet(data, out)).then(out => {
					// unshorten for quoted tweet
					resolve(out)
				})
			})
		})
	})
}
