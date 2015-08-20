exports.home = {
    get: function (req,res) {
        render.base(res,"index.ejs")
    },
}

exports.users = {
    get: function (req,res){
    }
}