var bodyParser = require("body-parser"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer"),
express  = require("express"),
app      = express();
//app.config
//mongoose.connect("mongodb://localhost/restful_blog_app");


mongoose.connect("mongodb://blog:blog@ds229909.mlab.com:29909/blogappcrypto");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
//mongoose.modelconfig
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body:  String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

//Routes
app.get("/", function(req, res) {
   res.redirect("/blogs");
});
//index route
app.get("/blogs", function(req, res){
    Blog.find({}, function (err, blogs)
    {if(err){console.log("There Is A Error!");
    }
    else{res.render("index", {blogs: blogs});
    }
    });
});
//new route
app.get("/blogs/new", function(req, res) {
   res.render("new"); 
});
//post blog 
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
    if(err){res.render("new");
    } else {res.redirect("/blogs");
    }
   }) 
;});
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){res.redirect("/blogs");}
        else{res.render("show.ejs", {blog: foundBlog});
    }
    })
});
//edit route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog)
    {if(err){res.render("/blogs")}
    else{res.render("edit", {blog: foundBlog});
    }        
    });
});
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, Updatedblog){
        if(err){res.redirect("/blogs")}
        else{res.redirect("/blogs/" + req.params.id)}
    });
});
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, req.body.blog, function(err, Updatedblog){
        if(err){res.redirect("/blogs")}
        else{res.redirect("/blogs")}
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server Blog is runing!");
});



