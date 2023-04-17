const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId(),
    // },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/, 'Please fill a valid email address'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return friends.length;
});

const User = model('user', userSchema);

User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    User.create([
      { username: 'jaytizzle', email: 'jordanpace45@gmail.com'},
      { username: 'jaydonger', email: 'jaydonger@yahoo.com'},
    ]);
  }
});

module.exports = User;
