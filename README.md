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
http POST http://localhost:3000/twitter/to/steem tweetLink="https://twitter.com/aviaryan123/status/1044822638798024704"
```

## TODO

- [ ] Integrate with IFTTT
- [ ] Use Twitter API to fetch tweet
