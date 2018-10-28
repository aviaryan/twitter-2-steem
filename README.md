# Twitter 2 Steem

Serverless function to post from Twitter to Steem, automatically.

## Deploy

First, set your AWS credentials.

```
serverless config credentials --provider aws --key xxxxxxxxxxxxxx --secret xxxxxxxxxxxxxx
```

Then deploy.

```
serverless deploy -v
```

## Development

```
serverless offline start
http POST http://localhost:3000/twitter/to/steem
http POST http://localhost:3000/twitter/to/steem tweetLink="https://twitter.com/aviaryan123/status/1056636936297824259"
```

## TODO

- [x] Integrate with IFTTT
- [x] Use Twitter API to fetch tweet
- [ ] Have Twitch video link in STEEM post
