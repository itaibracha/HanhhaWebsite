var express     = require("express"),
    app         = express();
  


 app.set("view engine", "ejs");
 app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("landing");
});
app.listen(8080, "localhost",  function(){
    console.log ("The Yelp Camp Server is runing");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log ("The Yelp Camp Server is runing");
});
