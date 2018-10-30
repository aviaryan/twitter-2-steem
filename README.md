# Twitter 2 Steem 🐦 ➡️ 💲

Serverless app to post from Twitter to Steem, automatically.

This project was built live on Twitch ([part 1](https://www.twitch.tv/videos/328611364) [part 2](https://www.twitch.tv/videos/328906758)). 

## In Action

Here is the [tweet](https://twitter.com/aviaryan123/status/1056903793781161985) I created.

![tweet](https://i.imgur.com/0zvLQ1r.png)

Here is the automatic [STEEM post](https://steemit.com/twitter2steem/@the-dragon/re-the-dragon-twitter2steem-20181029t134208431z) for the same.

![steem post](https://i.imgur.com/mpauJyT.png)

## Development

```
serverless offline start
http POST http://localhost:3000/twitter/to/steem tweetLink="https://twitter.com/aviaryan123/status/1056659654896422912"
```

## Deployment

First, set your AWS credentials.

```
serverless config credentials --provider aws --key xxxxxxxxxxxxxx --secret xxxxxxxxxxxxxx
```

Then deploy.

```
serverless deploy -v
```

## Can I use it for myself?

I am not sure if people would like to use it, hence I made it serverless, just for myself. If you would like to use it though, you can fork this project, deploy it to your AWS, change code where needed and use it.

Let me know if you need help with this. You can watch the livestreams if you are confused at any point.

## TODO

- [x] Integrate with IFTTT
- [x] Use Twitter API to fetch tweet
- [x] Handle @ Twitter mentions
- [x] Fix shortened URLs
- [x] Handle quoted tweets
- [ ] Handle RTs and media uploads
- [ ] Have Twitch video link in STEEM post?
- [ ] Post only first-level tweets?
