const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');

router.get('/signup', (req, res) => {
    
    res.render('users/userSignup.ejs');
});

router.post('/signup', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.flash('success', 'Welcome to Airbnb!');
        res.redirect('/listings');
    } catch (e) {
        console.log("error in signup", e);
        req.flash('error', e.message);
        res.redirect('/signup');
    }
});

router.get('/', (req, res) => {
    res.render('users/userLogin.ejs');
});

router.post('/login',passport.authenticate('local', {failureRedirect :'/', failureFlash : true}), wrapAsync(async (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/listings';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}));


module.exports = router;