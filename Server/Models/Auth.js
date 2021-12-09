const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Auth = new Schema(
  {
    id: { type: String, require: [true], unique: true },
    name: { type: String, require: [true], unique: true },
    password: { type: String, require: [true] },
    role: { type: Number, require: [true] },
    state: { type: Boolean, require: [true], default: false },
    deadTime: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Auth", Auth);
