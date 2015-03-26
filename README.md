# hello-mongoose: Using Mongoose.js for elegant MongoDB object modeling in Node.js.  

MongoDB and Node.js are often used together because of their shared use of Javascript and its Object Notation (JSON).  Mongoose is a popular helper library that provides a more rigorous modeling environment for your data, enforcing a little bit more structure as needed, while still maintaining flexibility that makes MongoDB powerful.  In this article, you make a connection to a hosted MongoDB instance at add-on provider [MongoLab](http://mongolab.com) with Mongoose and model a simple object.  

## Deployment

To deploy [the app](http://hello-mongoose.herokuapp.com/) to Heroku you can use the Heroku button [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy) or follow these steps:

1. `git clone git://github.com/mongolab/hello-mongoose.git && cd hello-mongoose`
2. `heroku create`
3. `heroku addons:add mongolab`
3. `git push heroku master`
4. `heroku open`

## License

MIT Licensed
