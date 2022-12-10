var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const Joi = require("joi");

const User = require("../models/user")
const authmiddleware = require('../middlewares/auth-middleware')

const postUsersSchema = Joi.object({
    nickname: Joi.string().required(),
    email: Joi.string().email({
         minDomainSegments: 2, tlds: { allow: ['com', 'net'] } 
        }).required(),
    password: Joi.string().pattern(
        new RegExp('^[a-zA-Z0-9]{3,30}$'
        )).required(),
    confirmPassword: Joi.string().required(),
  });

const postAuthSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

router.post('/api/users', async(req,res) => {
    try{

        const {nickname, email, password, confirmPassword} = await postUsersSchema.validateAsync(req.body);
        const check_user_exist = await User.findOne({
            $or: [{email}, {nickname}]
        });
        if(check_user_exist){
            res.status(400).send({
                errorMessage : "이메일이나 닉네임이 이미 사용중입니다."
            });
            return;
        }
        else if(password !== confirmPassword){
            res.status(400).send({
                errorMessage : "비밀번호가 비밀번호 확인가 일치하지 않습니다."
            });
            return;
        }
        else{
            const user = new User({nickname, email, password})
            await user.save()
            res.status(201).send({
                successMessage : "회원가입이 완료 되었습니다."
            });
        }
    }
    catch(err){
        console.log(err.message);
        res.status(400).send({
            errorMessage : err.message
        });
    }

});

// 로그인
router.post('/api/auth', async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user){ 
        res.status(404).send({
            errorMessage : "입력하신 이메일과 일치하는 사용자가 존재하지 않습니다."
        });
        return;
    }
    else if(password == user.password){
        const token = jwt.sign({ userId : user.userId}, "secret_key");
        res.status(200).send({
            token
        });
        return({});
    }
    else{
        res.status(400).send({
            errorMessage : "비밀번호가 일치하지 않습니다."
        })
        return;
    }
})

router.get("/api/users/me", authmiddleware, async(req, res) => {
    const { user } = res.locals;
    res.status(200).send({
        user : res.locals.user
    });
});

module.exports = router;