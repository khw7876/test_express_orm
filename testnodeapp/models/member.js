
module.exports = (sequelize, DataTypes) => {

    //member 테이블과 맵핑되는 member모델 정의
    //return sequelize.define()메소드를 통해 물리테이블과 맵핑되는 모델클래스를 생성하고 반환한다.
    //sequelize.define('맵핑되는 물리 테이블명',{테이블의 데이터구조 정의},{테이블생성 옵션정보})
    //맵핑되는 물리 테이블명은 단수형태로 정의할것..실제생성되는 물리테이블은 복수형태로 생성됨. member(모델명) ->members(물리테이블명)
    //{테이블의 데이터구조 정의} = {속성(컬럼)명:{각종세팅정보정의(데이터타입,null허용여부,primarykey여부,자동채번여부..)},속성(컬럼)명:{},속성(컬럼)명:{}}
    return sequelize.define('member', 
    {
        member_id: {
             autoIncrement: true,
             type: DataTypes.INTEGER,
             allowNull: false,
             primaryKey: true,
             comment: '사용자고유번호',
        },
        email: {
         type: DataTypes.STRING(100),
         allowNull: false,
         comment: '메일주소',
       },
       member_pwd: {
         type: DataTypes.STRING(500),
         allowNull: false,
         comment: '사용자암호',
       },
       name: {
         type: DataTypes.STRING(100),
         allowNull: false,
         comment: '이름',
       },
       birthday: {
         type: DataTypes.INTEGER,
         allowNull: true,
         comment: '생년월일-19740523',
       },
       profile_path: {
         type: DataTypes.STRING(300),
         allowNull: true,
         comment: '프로필사진경로',
       },
       entry_state_code: {
         type: DataTypes.TINYINT,
         allowNull: false,
         comment: '가입상태코드 0:사용중지 1:사용중 2:탈퇴',
       },
       entry_date: {
         type: DataTypes.DATE,
         allowNull: false,
         comment: '가입일시',
       }
    }, 
    {
        timestamps: true,
        paranoid: true
    });
 
    //timestamps 는 물리적 테이블 createdAt,updatedAt컬럼을 자동추가하고
    //데이터 신규생성일시,수정일시 데이터를 자동으로 마킹해줍니다.
    //paranoid가 트루이면 deletedAt컬럼이 자동추가되고
    //삭제시 삭제일시정보가 자동 마킹되고 데이터는 실제 삭제되지 않습니다.
 
 };
 