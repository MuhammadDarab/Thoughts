const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy({
        callbackURL:'https://thoughtsbackend.vercel.app/auth/google/redirect',
        clientID:'367258283721-ppbo9e6g2o009dg6odvnpvnaerfqq0ki.apps.googleusercontent.com',
        clientSecret:'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'
    }, (accessToken, refreshToken, profile, done) => {
        done(null, profile)
    })
)
 
passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})