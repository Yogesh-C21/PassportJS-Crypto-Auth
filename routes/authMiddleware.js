module.exports.isAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        /* res.status(401).json({ msg: "You are not authorized to see this."}); */
        res.send('<h3>You are not authenticated</h3><p><a href="/login">Login</a></p>');
    }
};