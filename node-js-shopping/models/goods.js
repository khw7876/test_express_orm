
const mongoose = require("mongoose");

// 스키마를 정의하는데 테이블 당 어떠한 값이 들어가는지 정의 (여기가 django의 models.py 라고 보면 된다.)
const GoodsSchema = new mongoose.Schema({
    name : String,
    thumbnailIrl : String,
    category : String,
    price : Number
});

// 테이블을 지정해 주었다면, 거기에는 없지만, 새로 쓰고 싶은 데이터를 정의 할 때 사용한다.
GoodsSchema.virtual("goodsid").get(function(){
    return this._id.toHexString();
});
// Json 형식으로 사용 할 것이고, virtuals를 허용한다는 뜻 
GoodsSchema.set("toJSON", {
    virtuals : true,
});


module.exports = mongoose.model("Goods", GoodsSchema);