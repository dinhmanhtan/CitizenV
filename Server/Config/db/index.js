const mongoose = require("mongoose");

async function connect() {
  try {
    // url trên browse :
    // mongodb+srv://huythai:v9RrU23hq3kdyLX@cluster0.lpofb.mongodb.net/CitizenV?retryWrites=true&w=majority
    await mongoose.connect(
      "mongodb+srv://huythai:v9RrU23hq3kdyLX@cluster0.lpofb.mongodb.net/CitizenV"
    );
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect failure");
  }
}

module.exports = { connect };
