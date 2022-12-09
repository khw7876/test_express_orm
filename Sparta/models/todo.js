const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    value : String,
    doneAt : Date, // 체크를 언제 진행했는지 알 수 있다.
    order : Number,
});

TodoSchema.virtual("todoId").get(function(){
    return this._id.toHexString();
});
TodoSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("Todo", TodoSchema)