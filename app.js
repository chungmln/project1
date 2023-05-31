// 로그인하고 게시판에 글 작성 수정, 삭제 기능

// 프로젝트 시작
// package.json 만들기
// 사용할 모듈은 express express-session mysql2 ejs dotenv sequelize
// view engine 경로 설정
// body 객체 사용
// 서버 객체 만들고 대기상태

const express = require("express");
const session = require("express-session");
const dot = require("dotenv").config();
const path = require("path");
const app = express();
const { sequelize } = require('./models');
const SignUpRouters = require('./routers/signUp');
const LoginRouters = require('./routers/login');
const borderRouters = require("./routers/border");

app.set("views",path.join(__dirname,"page"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended : false}));
app.use(session({
    secret : process.env.SESSION_KEY, // 세션키 넣을 것
    resave : false, // 다시 저장할 지 여부
    saveUninitalized : false, // 초기화 여부
}));

// force : 초기화 여부
sequelize.sync({force : false}).then((e)=>{
    console.log("연결 성공");
}).catch((err)=>{
    console.log(err);
})
app.use("/signUp",SignUpRouters);
app.use("/login",LoginRouters);
app.use("/border",borderRouters);

app.listen(8000,()=>{
    console.log("서버 열림")
})





