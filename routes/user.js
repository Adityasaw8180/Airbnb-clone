const express = require('express');
const router = express.Router();
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const { redirectedUrl } = require('../middlewares.js');
const users = require('../controllers/user');

// SIGNUP ROUTES
router.get('/signup', users.renderSignup);
router.post('/signup', wrapAsync(users.signup));

// LOGIN ROUTES
router.get('/', users.renderLogin);
router.post(
    '/login',
    redirectedUrl,
    passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
    users.login
);

// LOGOUT ROUTE
router.get('/logout', users.logout);

module.exports = router;
