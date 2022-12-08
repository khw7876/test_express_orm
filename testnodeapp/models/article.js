module.exports = (sequelize, DataTypes) => {

    return sequelize.define('article', 
    {
        article_id: {
             autoIncrement: true,
             type: DataTypes.INTEGER,
             allowNull: false,
             primaryKey: true,
             comment: '게시글 고유번호',
        },
        title: {
         type: DataTypes.STRING(200),
         allowNull: false,
         comment: '글제목',
       },
       contents: {
         type: DataTypes.TEXT,
         allowNull: true,
         comment: '글내용',
       },
       email: {
         type: DataTypes.STRING(100),
         allowNull: true,
         comment: '메일주소',
       },
       writer: {
         type: DataTypes.STRING(100),
         allowNull: true,
         comment: '작성자명',
       },
       display: {
         type: DataTypes.STRING(1),
         allowNull: false,
         comment: '게시여부 Y:게시 N:게시안함',
       },
       view_cnt: {
         type: DataTypes.INTEGER,
         allowNull: false,
         comment: '조회수',
       },
       regist_date: {
         type: DataTypes.DATE,
         allowNull: false,
         comment: '등록일시',
       }
    }, 
    {
        timestamps: false,
        paranoid: false
    });
 
    //timestamps 는 물리적 테이블 createdAt,updatedAt컬럼을 자동추가하고
    //데이터 신규생성일시,수정일시 데이터를 자동으로 마킹해줍니다.
    //paranoid가 트루이면 deletedAt컬럼이 자동추가되고
    //삭제시 삭제일시정보가 자동 마킹되고 데이터는 실제 삭제되지 않습니다.
 
 };