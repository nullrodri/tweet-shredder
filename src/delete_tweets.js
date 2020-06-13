//Import Twitter client and the API authentication keys
const Twitter = require('twitter-lite')
const api_auth = require('../config')

//Import tweets from file
const tweets = require('../tweet')

//Init Twitter client
const client = new Twitter(api_auth)

//Get the current date
const now = Date.now()

//Tweets older than this time period (expressed in milliseconds) will be deleted, set to a year by default
const timePeriod = 365 * 24 * 60 * 60 * 1000 //A year in milliseconds

//Returns true if an amount of time greater than the time period has passed since the tweet was created, and false otherwise
function isOlderThan(tweet) {
	return Date.parse(tweet.tweet.created_at) < now - timePeriod
}

//Deletes all tweets in the array passed as an argument
async function deleteTweets(tweets) {
	console.log(tweets.length, ' tweets to delete')
	let deleted = 0
	for (const tweet of tweets) {
		try {
			await client.post('statuses/destroy', {
				id: tweet.tweet.id_str,
				trim_user: 1,
			})
			console.log(`Deleted tweet: ${tweet.tweet.full_text}`)
			deleted++
		} catch (response) {
			console.log(response.errors)
		}
	}
	console.log(`Deleted ${deleted} tweets`)
}

//Filter and delete the old tweets
deleteTweets(tweets.filter(isOlderThan))
