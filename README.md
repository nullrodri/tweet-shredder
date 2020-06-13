# tweet-shredder

A simple script to delete your old tweets

## Requisites

- You need to have Node and npm (which comes included with Node) installed (you can get them [here](https://nodejs.org/en/download/))
- You need a Twitter developer account (you can get one [here](https://developer.twitter.com))

## Installation

- Clone the repository
- Run the next command in the root of the repository:

```sh
npm install
```

## Before Running

### API Authentication

- Create an app on <https://developer.twitter.com/apps>
- Grab the Consumer Key (API Key) and Consumer Secret (API Secret Key) from Keys and tokens
- Generate and grab the Access Token and Access Token Secret from Keys and tokens
- Create a file named ".env" in the root of the repository and paste the following inside, replacing \<key> with the respective keys

```
CONSUMER_KEY=<key>
CONSUMER_SECRET=<key>
ACCESS_TOKEN_KEY=<key>
ACCESS_TOKEN_SECRET=<key>
```

### Getting your Twitter archive

- Follow the instructions [here](https://help.twitter.com/en/managing-your-account/how-to-download-your-twitter-archive) to download your Twitter archive
- Unzip the file you downloaded, and look for a file named **tweet.js** inside the **data** folder
- Copy and paste that file to the root of the repository
- Open the file in your favorite text editor. The first line should look like this:

```js
window.YTD.tweet.part0 = [ {
```

- Modify the file so that the first line looks like this:

```js
module.exports = [ {
```

- Save the file

#### Why do I need my Twitter archive?

Because Twitter's API only lets you access the last 3200 tweets a user has posted.

Since you can still interact with older tweets if you have their ID, you can bypass this restriction by downloading your archive (which includes the data of every tweet you ever posted) and extracting each tweet's ID from there.

Due to the fact that an old archive will not include the tweets you posted after you downloaded it, and it will include already deleted tweets if you used it to run this script before, you would need to download your archive every time you wanted to run this program, which makes it unsuitable for automation. A script that is easy to automate and run periodically (while still working correctly) is in the works.

### (Optional) Choose the time period after which your tweets will be deleted

By default, this script deletes all tweets that are at least a year old, but you can choose your own time frame. To do so, look for this line in **src/delete_tweets.js**

```js
const timePeriod = 365 * 24 * 60 * 60 * 1000 //A year in milliseconds
```

And change the value to the time frame you prefer, expressed in milliseconds. For example, if you wanted to delete tweets older than ten days:

```js
const timePeriod = 10 * 24 * 60 * 60 * 1000 //Ten days in milliseconds
```

You can use a calculator like [this one](http://www.kylesconverter.com/time/days-to-milliseconds) to convert from days to milliseconds. Another example, which would delete the tweets older than 45 days:

```js
const timePeriod = 3888000000 //Forty-five days in milliseconds
```

## Running the script

Run the next command to start the script:

```sh
node index.js
```

It will tell you the amount of tweets it's going to delete, and then print each tweet's text as it deletes them. When it finishes, it will tell you how many tweets were deleted.

It will take some time depending on the number of tweets it has to delete. For reference, it took around 4 hours when I used it to delete 26.000 tweets

## Authors

#### Rodrigo Menecozzi

- [@rodrimeh](https://github.com/rodrimeh) on Github
- Follow me on Twitter: [@rodrimeh](https://twitter.com/rodrimeh)

## License

[ISC license](https://opensource.org/licenses/ISC). Copyright © 2020.
