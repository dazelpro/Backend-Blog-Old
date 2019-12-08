const database        = require('../app-config/database');
const passport        = require('passport');
const JwtStrategy     = require('passport-jwt').Strategy;
const ExtractJwt      = require('passport-jwt').ExtractJwt;
const { jwtSecret }   = require('../app-config/jwt');

const strategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
};

passport.use(
    new JwtStrategy(strategyOptions, (jwt_payload, done) => {
        const id = jwt_payload.user;
        database.query('SELECT user_id, user_email, user_name FROM tbl_user WHERE user_id = ?', [id], function (error, user) {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    })
);