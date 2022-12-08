var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var expressLayouts = require('express-ejs-layouts');
var sequelize = require('./models/index.js').sequelize;

// 기본으로 깔려있던 라우팅 파일을 참조하는 영역
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// 내가 설정한 라우팅 파일을 참조하는 영역
var articleRouter = require('./routes/article');
var memberRouter = require('./routes/member');
var APIRouter = require('./routes/memberAPI')



var app = express();

sequelize.sync(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 레이아웃 합치기
app.set('layout', 'layoutPage'); //기본 레이아웃 페이지 뷰 설정하기 
app.set("layout extractScripts", true); //컨텐츠 페이지의 스크립트소스를 추출할지여부 정의 
app.use(expressLayouts); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 라우팅 파일의 기본 호출 주소 세팅 영역
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 내가 설정한 라우팅 파일의 기본 호출 주소 세팅 영역
app.use('/article', articleRouter);
app.use('/members', memberRouter);
app.use('/api/members', APIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
