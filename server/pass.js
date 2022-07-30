const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy({
        callbackURL:'/auth/google/redirect',
        // clientID: '305555164389-je9r576p8ghm9g9n7t7khahv0b24ml3a.apps.googleusercontent.com',
        // clientSecret: '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'
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