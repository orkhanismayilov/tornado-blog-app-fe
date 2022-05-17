const mongoose = require('mongoose');
const uuid = require('uuid').v4;
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, uniqueCaseInsensitive: true },
    password: { type: String, required: true },
  },
  {
    minimize: false,
    timestamps: {},
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  },
);

userSchema.virtual('id').get(() => this._id);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
