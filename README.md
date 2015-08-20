#Modulare Express Skeleton

A spookily coder friendly Express Skeleton. Uses Node with Express and [EJS](http://www.embeddedjs.com/) for templating. 

Run `npm start` or `nodemon app.js` to start the server (on port 3000) 
##Usage:

###Controllers

Define your controller code in `controllers/index.js` by exporting objects like so:

```javascript
exports.home = {
    get: function (req,res) {
        //display your webpage
    },
    post: function (req,res) {
        //post to database.
    }
}
...
```

The object that gets exported should have a function for each request method that the route requires. The Example above has a "get" and "post" function.

###Routes

Inspired by [Django](https://www.djangoproject.com/), Declare your routes in `routes/index.js` like so:

```javascript
module.exports = function(c){ 
    return {
        "/": c.home,
        "/users": c.users,
    } 
}
```

**`c`** is your controller code from above, so you just need to call `c.name` where `name` is an object you export in `controllers/index.js`

###Rendering

Rendering is handled by ejs, but with an extra layer. In `app.js`, the `render` object adds a wrapper to all pages (`base.ejs`). Use `render.base()` in your controllers. It takes 3 properties: the `res` response objcet, the filename, and an optional context object, like so:

```javascript
render.base(res,"index.ejs",{user:user})
```
You can add more of these wrappers by adding to the `render` object in `app.js`, like so:

```javascript
...
admin: function(res,fileToRender,props){
    this.wrap(res,fileToRender,"admin.ejs",props)
},
...
```