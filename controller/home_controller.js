module.exports.home = function(req, res) {
    // console.log(req.cookies);
    // Change the value of cookie
    // res.cookie('cookie_name', new cookie value);
    return res.render('home', {
        title:'Home'
    });
}


// module.exports.actionName = function(req, res) {}