// import required packages

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide your username"],
    minlength: [3, " username must be at least 3 characters"],
    maxlength: [50, " username cannot be more than 50 characters"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: String,
    required: true,
    unique: true,
  },
  birthdate: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "organizer"],
    default: "user",
  },
  instagram_profile: {
    type: String,
    required: false,
  },
  following: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      followedAt: { type: Date, default: Date.now },
    },
  ],
  total_following: {
    type: Number,
    default: 0,
  },
  followers: [
    {
      followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      followedAt: { type: Date, default: Date.now },
    },
  ],
  total_followers: {
    type: Number,
    default: 0,
  },
  joined_at: {
    type: Date,
    default: Date.now(),
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// hash passwords before saving to database

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// create JWT for users
UserSchema.methods.createJWT = function () {
  const user = this;
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  return token;
};

// compare password

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  const isMatch = await bcrypt.compare(candidatePassword, user.password);
  return isMatch;
};

// export the User Model

module.exports = mongoose.model("User", UserSchema);
