const { Schema, model } = require('mongoose');
const Answer = require("./answerModel.js");

const doubtSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String },
  summary: { type: String },
  category: [{ type: String, required: true }],
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 }
}, { timestamps: true });


module.exports = model('Doubt', doubtSchema);