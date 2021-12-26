const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Citizen = new Schema(
  {
    name: { type: String, require },
    DOB: { type: Date, require },
    idAddress: { type: String, require }, // id 010205 -> check auths
    sex: { type: String, require },
    CCCD: { type: String, default: "" },
    religion: { type: String, default: "" },
    academicLevel: { type: String, default: "" },
    job: { type: String, default: "" },
    tamTru: { type: String, default: "" },
    thuongTru: { type: String, default: "" },
    origin: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Citizen", Citizen);
