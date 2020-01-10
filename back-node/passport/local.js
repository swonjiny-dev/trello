const passport = require('passport');
const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy} = require('passport-local');
const db = require('../models');

module.exports = ()=>{
    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
    } , async(email, password , done)=>{
        try {
            const userInfo = await db.User.findOne({where : {email}});
            if(!userInfo) {
                return done(null, false , {msg : '등록되지 않은 이메일 입니다.'});
            }
            const result = await bcrypt.compare(password , userInfo.password);
            if(result) {
                return done(null,userInfo );
            }else{
                return done(null, false , {msg : '사용자 정보가 다릅니다.'});
            }
        } catch (err) {
            console.error(err);
            return done(err);
        }
    }))
}