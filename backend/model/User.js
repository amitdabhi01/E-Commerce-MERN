import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Please use a valid 10-digit phone number"],
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (this.isModified) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
