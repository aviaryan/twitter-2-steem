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
```
