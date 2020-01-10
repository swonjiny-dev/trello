const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const {isLoggedIn , isNotLoggedIn} = require('./middlewares');
const router = express.Router();

router.get('/' , function(req , res, next){
    res.send('user');
});

// 사용자조회
router.get('/:id' ,async (req ,res,next)=>{
    try {
        const user = await db.User.findOne({
            where : { id: parseInt(req.params.id,10)},
        });
        res.json(user)
    } catch (error) {
        console.error(error);
        next(error);
    }
});
// 로그린 요청
router.post('/login' ,isNotLoggedIn, (req, res, next)=>{
    passport.authenticate('local',(error,user,info)=>{
        if(error){
            console.error(error);
            return next(err);
        }

        if(info){
            return req.status(401).send(info.reason);
        }
        return req.login(user , async(error)=>{
            if(error){
                console.error(error);
                return next(error);
            }
            // 세션정보는 id 만 존재하므로 
            const userInfo = await db.User.findOne({
                where : {id : user.id},
                attributes: ['id', 'email', 'nickname' , 'level'],
            });
            return res.json(userInfo);
        });
    })(req, res, next);
});

// 회원가입
router.post('/' , async(req , res, next)=>{
    try {
        // 가입유무 확인
        const user = await db.User.findOne({
            where : {
                email : req.body.email,
            },
        });
        if(user){
            return res.status(403).json({
                reason : '이미가입된 회원입니다.'
            });
        }
        // 가입처리
        const hash = await bcrypt.hash(req.body.password , 10);
        await db.User.create({
            email : req.body.email,
            password : hash,
            nickname : req.body.nickname,
            level : req.body.level
        });
        // 로그인 시키기
        // 패스포트 local 전략적용 - passport - local.js
        passport.authenticate('local',(error,user,info)=>{
            if(error){
                console.error(error);
                return next(err);
            }

            if(info){
                return req.status(401).send(info.reason);
            }
            // req.login passport 에 의해서 적용된
            return req.login(user , async(error)=>{
                
                if(error){
                    console.error(error);
                    return next(error);
                }
                // 세션정보는 id 만 존재하므로 
                const userInfo = await db.User.findOne({
                    where : {id : user.id},
                    attributes : ['id','nickname','email' , 'level'],
                     
                });
                return res.json(userInfo);
            });
        })(req, res, next);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
module.exports = router;