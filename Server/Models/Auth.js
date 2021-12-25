const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Auth = new Schema(
  {
    id: { type: String, require: [true], unique: true },
    name: { type: String, require: [true], unique: true },
    password: { type: String, require: [true] },
    role: { type: Number, require: [true] },
    state: { type: Boolean, require: [true], default: false },
    startTime: { type: Date, default: null },
    deadTime: { type: Date, default: null },
    address: { type: String },
    progress: { type: Boolean, default: false },
    levelName: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Auth", Auth);
