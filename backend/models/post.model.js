const mongoose = require('mongoose');
const uuid = require('uuid').v4;
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    title: { type: String, required: true },
    content: { type: String, required: true },
    imagePath: { type: String, required: true },
    author: { type: String, ref: 'User', required: true },
  },
  {
    minimize: false,
    timestamps: {},
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        const { _id, __v, ...post } = ret;
        return post;
      },
    },
  },
);

postSchema.virtual('id').get(() => this._id);

module.exports = mongoose.model('Post', postSchema);
