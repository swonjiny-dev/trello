const passport = require('passport');
const local = require('./local');
const db = require('../models');

module.exports =()=>{
    passport.serializeUser((user,done)=>{
        return done(null,user.id);
    });

    passport.deserializeUser(async(id ,done)=>{
        try {
            const user = await db.User.findOne({
                where : {id},
                attributes : ['id' , 'nickname' , 'level'],
            });
            return done(null,user);
        } catch (error) {
            return done(error);
        }
    });
    local();
}