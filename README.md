# NCNews

With this project I'm intending to make a [reddit](https://reddit.com/) clone for learning purposes.
To access this project hosted by heroku click on the following link:

* [NCNews](https://glacial-brushlands-79472.herokuapp.com/api)

If you’d prefer to run locally you can follow the instructions below.

## Getting Started

1. In order to run this code you need to install nodeJS. To check if you have nodeJS installed open you terminal window and run/paste the following command:

```
node -v
```

If it is installed, it will show you the version of node you have installed. e.g.:
`v8.4.0.`
If you do not have nodeJS installed, follow the installation instructions found [here](https://nodejs.org/en/download/package-manager/).

2. Make sure you have `npm` installed. Open a terminal window and run the following command:

```
npm -v
```

If it's installed, it will show you the version of npm you have installed. e.g.: `5.5.1.`
If you do not have npm installed, then run/paste the following command:

```
npm install npm
```

3. Make sure you have MongoDB installed in your computer, to check if you have MongoDB run the following command in your console:

```
mongod -version
```

If it's installed it will show you what version is installed, e.g: `db version v3.4.10`.
If is not installed you can follow these links for the instalation:

* [Install MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
* [MongoDB Windows](https://docs.mongodb.com/tutorials/install-mongodb-on-windows/#install-mongodb-community-edition)
* [MongoDB Mac](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
* [MongoDB Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)

## Installation

Please follow the instructions to clone this project and install all the necessary dependencies.

1. Open a terminal and navigate to the folder in which you wish to save the project. Run the following command:

```
git clone https://github.com/Dpartipilo/NCNews.git
```

2. Navigate into the new created folder `e.g: NCNews` and run the following command:

```
npm install
```

3. Is usually a good idea to run the database in a separate console window/tab, now on your new console run the following command:

```
mongod
```

Wait a couple of seconds until is ready to accept requests.

4. Once `mongod` is successfully running you are ready to run the tests. To run the tests use the following command:

```
npm test
```

## Running the server

1. In order to run the server and be able to open the different end points please run the command:

```
npm run dev
```

2. Open you browser and type: `http://localhost:3050/api/`

### Routes

These are the the different endpoints that can be reached.

```
GET /api/topics
```

Get all the topics

```
GET /api/topics/:topic_id/articles
```

Return all the articles for a certain topic

```
GET /api/articles
```

Returns all the articles

```
GET /api/articles/:article_id/comments
```

Get all the comments for a individual article

```
POST /api/articles/:article_id/comments
```

Add a new comment to an article. This route requires a JSON body with a comment key and value pair
e.g: {"comment": "This is my new comment"}

```
PUT /api/articles/:article_id
```

Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
e.g: /api/articles/:article_id?vote=up

```
PUT /api/comments/:comment_id
```

Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
e.g: /api/comments/:comment_id?vote=down

```
DELETE /api/comments/:comment_id
```

Deletes a comment

```
GET /api/users/:username
```

Returns a JSON object with the profile data for the specified user.

## Dependencies

* [body-parser](https://www.npmjs.com/package/body-parser)
* [cors](https://www.npmjs.com/package/cors)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express](https://www.npmjs.com/package/express)
* [mongodb](https://www.npmjs.com/package/mongodb)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [async](https://www.npmjs.com/package/async)
* [chance](https://www.npmjs.com/package/chance)
* [eslint](https://www.npmjs.com/package/eslint)
* [log4js](https://www.npmjs.com/package/log4js)
* [moment](https://www.npmjs.com/package/moment)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [supertest](https://www.npmjs.com/package/supertest)
* [underscore](http://underscorejs.org/)
* [Mocha](https://mochajs.org/)
* [Chai](http://chaijs.com/)

## Author

* [Diego Partipilo](https://github.com/Dpartipilo)

## Acknowledgments

This project was completed as part of [Northcoders](https://northcoders.com/) sprints, inspired by [reddit](http://reddit.com/).
