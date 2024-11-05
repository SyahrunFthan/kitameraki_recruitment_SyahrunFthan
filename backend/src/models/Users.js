const { Schema, default: mongoose } = require("mongoose");
const { v4 } = require("uuid");

const SchemaUsers = new Schema(
  {
    id: {
      type: String,
      default: v4,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Menyimpan createdAt dan updatedAt otomatis
    versionKey: false, // Menghilangkan __v field
  }
);

module.exports = mongoose.model("User", SchemaUsers);
