var express = require("express");
var router = express.Router();

// 호출 주소 : http://localhost:3000/api/members/all
router.get('/all', function(req, res){
    var user_list = [{
        user_id : "hyun",
        name : "hyunwoo",
        email : "khw7876@gmail.com"
    },
    {
        user_id : "hyun",
        name : "hyunwoo",
        email : "khw7876@gmail.com"
    }];
    res.json(user_list);
});

module.exports = router;