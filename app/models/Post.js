const mongoose = require('mongoose');
const { Schema } = mongoose;
const constants = require('../constants/index');


const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is empty"],
    minLength: 1
  },
  content: {
    type: String,
    required: [true, "Content is empty"],
    minLength: 1
  },
  _user: { type: Schema.Types.ObjectId, ref: constants.USER },
  imageUrls: [{
    type: String,
    match: [
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
      'Please provide a valid image url',
    ]
  }]
}, {
    timestamps: true
});

mongoose.model(constants.POST, postSchema);
