var express = require('express');
var router = express.Router();

/* 메인 페이지 라우팅 메서드 
호출하는 주소 : http://localhost:3000
*/
router.get('/', function(req, res, next) {
  // HTTP Response 객체의 render("뷰 파일 이름 ex)'index.enj', 뷰 파일에 전달 할 JSON데이터")
  res.render('index', { title: '데몬 ~' });
});


router.get('/sample', function(req, res, next){
  // 웹서버에서 웹 브라우저로 리소스를 전달하는 객체로 response 객체의 render("뷰 파일명 or 뷰에 전달할 json데이터") 메소드 호출
  res.status(200).render("sampleviews");
});

router.get('/intro', function(req, res, next){
  res.status(200).render("sampleviews");
});

/* 
회사소개 
http://localhost:3000/company/intro
*/
router.get('/company/intro', function(req, res, next) {
  res.render('index',{ title: 'Express' });
});


/* 
문의하기 
http://localhost:3000/company/intro
*/
router.get('/contact', function(req, res, next) {
  res.render('index',{ title: 'Express' });
});


module.exports = router;
