const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Notifications = new Schema(
  {
    type : {type : Number, require},
    idAddress : {type : String, require},
    content : {type : String, require},
    date : {type : Date},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notififcation", Notifications);
