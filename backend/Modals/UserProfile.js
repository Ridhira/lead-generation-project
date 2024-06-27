const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserProfileSchema = new Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dob: { type: Date },
    phone: { type: String, unique: true },
    designation: { type: String },
    description: { type: String },
    image: { type: String },
    address: { type: String },
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.profile || mongoose.model("profile", UserProfileSchema);

// const User = mongoose.model("Users", UserSchema);

module.exports = User;
