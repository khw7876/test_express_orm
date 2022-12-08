
var todate = Date.now();

console.log("오늘 날짜정보 : ", todate)

var moment = require('moment');
require('dotenv').config();


var monetDate = Date.now();
var dateString = moment(monetDate).format("YYYY-MM-DD hh:mm:ss");

var secret_key = process.env.SECRET_KEY;

console.log("secret_key : ", secret_key);
console.log("오늘날짜 원하는 형태로 보기 : ", dateString);



// var moment = require('moment');

// require('dotenv').config();

// var date = Date.now();
// console.log("오늘날짜",date);

// var dateString = moment(Date.now()).format("YYYY-MM-DD hh:mm:ss");
// console.log("Moment 오늘날짜",dateString);


// var uploadPath = process.env.UPLOAD_PATH;
// console.log("기본설정 업로드 경로확인",uploadPath);

// console.log("노드기반 서버콘솔 로깅합니다.");