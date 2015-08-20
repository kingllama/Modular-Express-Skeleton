//the main file that runs the server. Includes all app.set and module requirements.
var express = require('express');
var app = express();

require('ejs');
app.set('view engine', 'ejs');
app.set('views',[__dirname + '/views',__dirname + '/errors']);
app.use(express.static(__dirname + '/public'));

var c = require("./controllers");

// Custom EJS render function. Wraps the page in a "base" page.
render = {
    wrap: function(res,fileToRender,wrapper,props){
        if (props == undefined){
            props = {}
        }
        props.partial = fileToRender
        res.render(wrapper,props)
    },
    base: function(res,fileToRender,props){
        this.wrap(res,fileToRender,"base.ejs",props)
    },
    // // Example of second wrapper: 
    // admin: function(res,fileToRender,props){
    //     this.wrap(res,fileToRender,"admin.ejs",props)
    // },
};

var register = function(method,route,controller) {
    return app[method](route,function(req,res){
        controller(req,res);
    }); 
};

//links urls with controllers
var routes = require('./routes')(c);
for (var route in routes) {
    var controllers = routes[route];
    for(var method in controllers){
        var controller = controllers[method]
        register(method,route,controller);
        console.log("event registered: app."+method+"(\""+route+"\",function);");
    }
};


app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404.ejs', { url: req.url });
    return;
  }

  res.type('txt').send('404, page not found');
});


var server = app.listen(2001, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port)
});