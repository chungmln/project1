const jwt = require("jsonwebtoken");

exports.isLogin = (req,res,next) =>{
    const {access_token} = req.session;
    jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, acc_decoded)=>{
      
        if(err){
            res.send("로그인 다시하세요");

        }else{
            // acc.decoded 키를 추가해서 값을 전달
            req.acc_decoded = acc_decoded;
            // 토큰이 유요한 동안 로그인이 되어있는 것이고
            // 유저의 필요한 정보도 payload 값에 있기 때문에 복호화해서 사용이 가능하다.
            // 다음 미들웨어 실행
            next();
        }

    })
}