# Twitter 2 Steem

Serverless function to post from Twitter to Steem, automatically.

This project was built [live on Twitch](https://www.twitch.tv/videos/328611364). 

[Sample STEEM post](https://steemit.com/twitter2steem/@the-dragon/re-the-dragon-twitter2steem-20181028t204908565z)

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

## Can I use it for myself?

I am not sure if people would like to use it, hence I made it serverless, just for myself. If you would like to use it though, you can fork this project, deploy it to your AWS, change code where needed and use it.

Let me know if you need help with this. You can watch the [livestream](https://www.twitch.tv/videos/328611364) if you are confused at any point.

## TODO

- [x] Integrate with IFTTT
- [x] Use Twitter API to fetch tweet
- [x] Handle @ Twitter mentions
- [ ] Handle RTs and media uploads
- [ ] Have Twitch video link in STEEM post?
- [ ] Post only first-level tweets?
