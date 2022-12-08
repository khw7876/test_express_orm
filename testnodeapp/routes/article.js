var express = require("express");
var router = express.Router();

// DB 참조
var db = require('../models/index');

// 게시글 목록 조회 페이지 호출 라우팅 메소드
router.get('/list', async(req, res) => {

    // var articles =[
    //     { 
    //         article_id:1,
    //         title:"제목1입니다.",
    //         contents:"내용1입니다.",
    //         email:"test@test.co.kr",
    //         writer:"강창훈",
    //         display:"Y"
    //     },
    //     { 
    //         article_id:2,
    //         title:"제목2입니다.",
    //         contents:"내용2입니다.",
    //         email:"test2@test.co.kr",
    //         writer:"강창훈2",
    //         display:"N"
    //     }
    // ];

    const articles = await db.Article.findall();

    res.render("article/list", {articles});
});

// 게시글 등록 페이지 호출 라우팅 메소드
router.get('/regist', function(req, res){
    res.render("article/regist");
});

// 게시글 데이터 등록처리 라우팅 메소드
// 포스트를 처리할 때는 비동기를 사용한다! 
router.post('/regist', async (req, res)=>{

    var title = req.body.title;
    var content = req.body.content;
    var email = req.body.email;
    var writer = req.body.writer;
    var display = req.body.display;
    var view_cnt = req.body.view_cnt;

    var articleData = {
        title, 
        content, 
        email, 
        writer, 
        display, 
        view_cnt,
        regist_date : Date.now(),
    }

    // 게시글 데이터 등록처리 ORM에 의해 insert query가 동작한다.
    // models/index.js에서 db에 Article을 연동했기에 사용이 가능함
    await db.Article.create(articleData)

    res.redirect("/article/list");
});

// 게시글 확인/수정 페이지 호출 라우팅 메소드
// article/modify:aid=1
router.get('/modify:aid', async(req, res) => {

    // var articleIdx = req.params.aid;

    // console.log("쿼리 스트링으로 넘어 온 경우 추출 : ", articleIdx)
    
    // 주소를 "/modify:aid" 처럼 하면은 aid에 해당하는 값이 들어온다. - 와일드 카드 방식
    
    // var article={
    //     title:"제목입니다.",
    //     contents:"내용입니다.",
    //     email:"test@test.co.kr",
    //     writer:"강창훈",
    //     display:"N"
    //   };

    const article = await db.Article.findone({where:{article_id : aid}});

    res.render("article/modify", {article});
});

// router.post()는 request.data를 받아서 처리한다
router.post('/modify', async(req, res) => {

    // 폼태그에 입력한 사용자 데이터를 추출한다. req.body.htm요소의 name값

    var articleId = req.body.articleId;
    var title = req.body.title;
    var contents = req.body.contents;
    var email = req.body.email;
    var writer = req.body.writer;
    var display = req.body.display;
    // 추출된 값을 db에 저장한다.
    // 저장 json 데이터 정의
    var article = {
        title,
        contents,
        email,
        writer,
        display
    }

    await db.Article.update(article, {where:{article_id : articleId}})
    
    console.log("폼에서 전달된 게시글 데이터 :", article)

    // 수정 처리 이후 특정 페이지로 바로 이동하기
    
    res.redirect('/articles/list');
})

router.get('/delete', async(req, res) => {
    
    var articleIdx = req.query.aid;

    await db.Article.destroy({where:{article_id : articleIdx}});
})
module.exports = router;