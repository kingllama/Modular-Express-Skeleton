//URLS: "c" is your controllers
module.exports = function(c){ 
    return {
        //define your urls here
        "/": c.home,
        "/users": c.users,
    } 
}