const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SEC,
    callbackURL: 'https://reactlogin-1xsq.onrender.com/auth/google/callback'
  },
  async(accessToken, refreshToken, profile, done) => {
    // Handle user authentication and session management here
  
    return done(null, profile);
  }
));
passport.serializeUser((user, done) => {
  done(null, user); // You can serialize just the user's ID if needed
});

// Deserialize the user object from the session
passport.deserializeUser((user, done) => {
  done(null, user); // You can use a database lookup to retrieve user details if necessary
});
module.exports=passport
