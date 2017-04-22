var express = require('express');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var  util = require('util');
var bodyParser = require('body-parser');
var app = express();
mongoose.connect('mongodb://sujesh:sujeshunni123@ds115411.mlab.com:15411/myblog', function (error) {
    if (error) {
        console.log(error);
    }
});

// Mongoose Schema definition
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

// Mongoose Model definition
var Blog = mongoose.model('Blog', blogSchema);

var data="";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.use('/public', express.static(path.join(__dirname + '/public')));
app.set('view engine', 'pug');
app.get('/', function(req, res){
 Blog.find({}, function (err, docs) {
       // res.json(docs);
       //for(var i=0;i<docs.length;i++)
        //res.render('index',{title:docs[i].title,author:docs[i].author,date:docs[i].date,body:docs[i].body});
        res.render('index',{docs});
    });
  
});
app.get('/blog', function(req, res){

        res.render('post');  

});
app.get('/index', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/post',function(req,res){
 
    var data={};
    data.ptitle=req.body.ptitle;
    data.pauthor=req.body.pauthor;
    data.pcontent=req.body.pcontent;
//console.log(req.params.ptitle);
var post = new Blog({title:data.ptitle, author:data.pauthor, 
                          body:data.pcontent});

//save model to MongoDB
post.save(function (err) {
  if (err) {
    return err;
  }
  else {
    console.log("Post saved");
    
    //res.end("Data Written");
    res.redirect('/');
  }
});











});
var server = app.listen(process.env.PORT || 5000, function(){
  console.log('Server listening on port 5000');
});
