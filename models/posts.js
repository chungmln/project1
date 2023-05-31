const Sequelize = require("sequelize");

class Post extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            msg : {
                type : Sequelize.STRING(20),
                allowNull : false,
            }
        },{
            sequelize,
            timestamps : true,
            modelName : "Post",
            tableName : "posts",
            paranoid : false,
            charset : "utf8",
            collate : "utf8_general_ci"
        })
    }
    static associate(db){
        db.Post.belongsTo(db.User,{foreignKey : "user_id", targetKey : "id"});
    }
}

module.exports = Post;




// const Sequelize = require("sequelize");

// class Post extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init(
//       {
//         msg: {
//           type: Sequelize.STRING(20), // "msg"라는 열은 문자열 데이터 타입으로 정의되며 최대 길이는 20입니다.
//           allowNull: false, // "msg" 열은 null 값을 허용하지 않습니다.
//         },
//       },
//       {
//         sequelize, // Sequelize 인스턴스를 전달받습니다.
//         timestamps: true, // createdAt 및 updatedAt 열을 자동으로 생성하도록 설정합니다.
//         modelName: "Post", // 모델의 이름을 "Post"로 지정합니다.
//         tableName: "posts", // 실제 데이터베이스 테이블의 이름을 "posts"로 지정합니다.
//         paranoid: false, // 소프트 삭제 기능을 사용하지 않도록 설정합니다.
//         charset: "utf8", // 문자 인코딩을 UTF-8로 지정합니다.
//         collate: "utf8_general_ci", // 문자열 비교에 대소문자를 구분하지 않도록 설정합니다.
//       }
//     );
//   }

//   static associate(db) {
//     db.Post.belongsTo(db.User, {
//       foreignKey: "user_id", // "Post" 모델에 "user_id"라는 외래 키를 추가합니다.
//       targetKey: "id", // "User" 모델에서 참조할 대상 열은 "id"입니다.
//     });
//   }
// }

// module.exports = Post;
