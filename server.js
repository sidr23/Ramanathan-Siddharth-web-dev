var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/meanblogs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// configure a public directory to host static content

app.post("/api/post/",createPost);
app.get("/api/post", findAllPosts);
app.delete("/api/post/:id", removePost);

// function findAllPosts(req, res) {
//     console.log(req);
//     res.send(posts);
// }
var posts = [];
// var posts = [
//     {
//         title: "Post 2",
//         body: "body 2"
//     },
//     {
//         title: "Post 3",
//         body: "body 3"
//     },
//     {
//         title: "Post 4",
//         body: "body 4"
//     },
//     {
//         title: "Post 5",
//         body: "body 5"
//     }
// ]

var PostSchema = mongoose.Schema ({
    title: String,
    body:String
});

var PostModel = mongoose.model("PostModel", PostSchema);

function removePost(req,res) {
    var id = req.params.id;
    PostModel
        .remove({_id: id})
        .then(function (stat) {
            findAllPosts(req,res);
        });

}

function createPost(req,res) {
    var post = req.body;
    PostModel
        .create(post)
        .then(function (doc) {
            posts.push(doc);
            res.json(posts);
        });
}

function findAllPosts(req,res) {
    PostModel.find()
        .then(function (docs) {
            posts = docs;
            res.json(posts);
        })
}
require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
