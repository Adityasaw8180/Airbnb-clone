const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');

router.get('/signup', (req, res) => {
    res.render('users/userSignup.ejs');
});

router.post('/signup', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        req.flash('success', 'Welcome to Airbnb!');
        res.redirect('/listings');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
});


module.exports = router;