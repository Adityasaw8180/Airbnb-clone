const User = require('../models/user');

module.exports.renderSignup = (req, res) => {
    res.render('users/userSignup.ejs');
};

module.exports.signup = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);

            req.flash('success', 'Welcome to Airbnb!');
            res.redirect('/listings');
        });

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render('users/userLogin.ejs');
};

module.exports.login = (req, res) => {
    req.flash('success', `Welcome back! ${req.user.username}`);
    const redirectUrl = res.locals.redirectUrl || '/listings';
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.logout((err) => {
            if (err) return next(err);

            req.flash('success', 'You logged out!');
            res.redirect('/listings');
        });
    } else {
        req.flash('error', 'You are not logged in!');
        res.redirect('/');
    }
};
