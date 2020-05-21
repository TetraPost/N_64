/* Mongoose */
const path = require('path');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchemeList = {
  strategy: {
    type: Schema.Types.String,
    default: '',
  },
  data: {
    type: Schema.Types.Mixed,
    // если авторизация local
    // token: { type: Schema.Types.String },
    // password: { type: Schema.Types.String },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
};

const articleScheme = new Schema(articleSchemeList, { timestamps: true });

const modelname = path.basename(__filename, '.js');
const model = mongoose.model(modelname, articleScheme);
module.exports = model;