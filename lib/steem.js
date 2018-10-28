const steem = require('steem');

// https://steemit.com/curation/@the-dragon/the-most-beautiful-thing-in-this-world-love.json
// https://steemit.com/curation/@the-dragon/hapramp-xyz.json

// https://steemit.com/curation/@the-dragon/re-the-dragon-12345-20180217t060957380z.json

steem.api.setOptions({ url: 'https://api.steemit.com' });

module.exports = async function(tweetId, content) {
	if (!process.env.STEEMIT_PK) {
		console.log('STEEMIT PK not defined')
		return 'PK not found'
	}
	console.log('step 1')
	const permlink = steem.formatter.commentPermlink('the-dragon', 'twitter2steem');
	// TODO: format content nicely, include twitter link
	const operations = [
		['comment',
			{
				parent_author: '',
				parent_permlink: 'twitter2steem',  // first tag
				author: 'the-dragon',
				permlink,
				title: '',
				body: content,
				json_metadata: JSON.stringify({
					tags: ['twitter2steem', 'programming'],
					app: `twitter2steem/0.0.1`
				})
			}
		],
		['comment_options', {
			author: 'the-dragon',
			permlink,
			max_accepted_payout: '1000000.000 SBD',
			percent_steem_dollars: 0,  // all SP, 10000 means all SBD
			allow_votes: true,
			allow_curation_rewards: true,
			// extensions: [
			// 	[0, {
			// 		beneficiaries: [
			// 			{ account: 'hapramp', weight: 2000 }
			// 		]
			// 	}]
			// ]
		}]
	];
	console.log('step 2')
	const tx = await steem.broadcast.sendAsync(
		{ operations, extensions: [] },
		{ posting: process.env.STEEMIT_PK }
	);
	console.log('step 3')
	// console.log(tx);
	return 'POSTED ' + tx.block_num + `\nhttps://steemit.com/twitter2steem/@the-dragon/${permlink}`;
}
