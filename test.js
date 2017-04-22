var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sujesh', function (error) {
    if (error) {
        console.log(error);
    }
});
var Schema = mongoose.Schema;
var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
var Blog = mongoose.model('Blog', blogSchema);
var post = new Blog({title: "My Second post", author: "Sujesh T", 
													body: "There is nothing like localhost"});

//save model to MongoDB
post.save(function (err) {
  if (err) {
		return err;
  }
  else {
  	console.log("Post saved");
  }
});