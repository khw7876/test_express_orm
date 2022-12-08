var express = require("express");
var router = express.Router();

// 회원 목록 조회 페이지 호출 라우팅 메소드
router.get('/list', function(req, res){
    res.render("member/list");
});

// 회원 등록 페이지 호출 라우팅 메소드
router.get('/entry', function(req, res){
    res.render("member/entry");
});

// 회원 로그인 페이지 호출 라우팅 메소드
// url : http://localhost:3000/members/login
router.get('/login', function(req, res){
    res.render("member/login");
});

module.exports = router;