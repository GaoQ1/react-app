var express = require('express');
var router = express.Router();

router.all('*', function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  next();
})

router.post('/login', function(req, res, next) {//登录
  res.status(200).json({code: 1, data: {}});
});

router.post('/getNote', function(req, res, next) {//获取验证码
  res.status(200).json({code: 1, data: {note: 1234}});
});

router.post('/getAward', function(req, res, next) {//获得旅游度假红包
  res.status(200).json({code: 1, data: {award: 2000}});
});

router.post('/users', function(req,res,next){//用户信息例子
  if(req.body.name == 'gaoquan' && req.body.age == 26){
    res.status(200).json({code: 1, data: { info: '嗨喽，你好！' }});
  }else{
    res.status(200).json({code: 0, msg: '姓名有误！'});
  }
});

router.post('/infos', function(req,res,next){//消息例子
  if(req.body.name == 'langli'){
    res.status(200).json({code: 1, data: { article: [
      {'title': '链接1', 'url': 'http://www.baidu.com'},
      {'title': '链接2', 'url': 'http://www.baidu.com'},
      {'title': '链接3', 'url': 'http://www.baidu.com'},
      {'title': '链接4', 'url': 'http://www.baidu.com'},
      {'title': '链接5', 'url': 'http://www.baidu.com'}
    ] }});
  }else{
    res.status(200).json({code: 0, msg: '信息有误！'});
  }
});

router.get('/articles', function(req,res,next){//获取信息列表
  if(req.query.id == 1){
    res.status(200).json({code: 1, data: { article: [
      {'title': '标题1', 'content': '第一篇文章！'},
      {'title': '标题2', 'content': '第二篇文章！'},
      {'title': '标题3', 'content': '第三篇文章！'},
      {'title': '标题4', 'content': '第四篇文章！'}
    ] }});
  }else{
    res.status(200).json({code: 0, msg: '查不到此id的文章！'});
  }
});

module.exports = router;
