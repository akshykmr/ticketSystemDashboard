const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
 {
    email: {
      type: String,
      unique:true,
      required: true,
    },
    phone : { type : Number, unique : true},
    name: {
      type: String,
    },
    role: {
      type: String,
      enum: ["super_admin", "user"],
      default: "user",
    },
    password: {
      type: String,
    },
    is_deactivated: {
      type: Boolean,
      default: false,
    },
    ticketHistoy: [{}],
 },
 { timestamps: true }
);

const User = mongoose.model("users", userSchema);

const superAdmin = async () => {
 const isExist = await User.findOne({ role: "super_admin" });
 if (!isExist) {
    let obj = {
      email: "superadmin@gmail.com",
      name: "Super Admin",
      password: bcrypt.hashSync("SuperAdmin@123", 5),
      phone: "1234567890",
      role: "super_admin",
    };
    await User.create(obj);
    console.log("Super Admin Created ");
 } 
};

superAdmin();

module.exports = User;