const {User, Post} = require("../models");

exports.borderMain = async(req,res)=>{
    // 해당 유저의 마이페이지
    const { acc_decoded } = req;
    const user = await User.findOne({where : {name : acc_decoded.name}});
    res.render("main",{data : user});
}

exports.createBorder = async (req,res)=>{
    const { acc_decoded } = req;
    const { user_post } = req.body;
    // Post table에 글 추가
    await Post.create({
        msg : user_post,
        user_id : acc_decoded.id
    });
    // 해당 유조가 작성한 글들을 볼수 있는 페이지로 이동
    res.redirect(`/border/view/${acc_decoded.id}`);
}

exports.borderView = (req,res)=>{
    User.findOne(
        {
            where : {id : req.params.id} ,
             include : [ 
                {model:Post} 
            ]
    }
).then((e)=>{
    e.dataValues.Posts = e.dataValues.Posts.map((i) => i.dataValues);
    const Posts = e.dataValues;
    console.log(Posts);
    res.render("border",{data:Posts});
})
}

exports.updateBorder = async (req,res) =>{
    const {acc_decoded} = req;
    const {msg} = req.body;
    const { id } = req.params;
    // 수정 메서드 사용
    // 첫번째 매개변수는 객체로 수정할 값
    // 두번째 매개변수는 객체로 조건수정할 내용을 찾아서
    await Post.update({msg},{where : {id}});
    res.redirect(`/border/view/${acc_decoded.id}`);
}

exports.borderDel = async(req,res)=>{
    // 삭제 메서드 사용
    await  Post.destroy({
        where : {id : req.params.id}
    });
    res.redirect('/border');
}