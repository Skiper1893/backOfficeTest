const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const beautifulUnique = require('mongoose-beautiful-unique-validation')

const userSchema = new Schema({
  firstname: {
    type: String,
    text: true,
    required: {
      value: true,
      message: 'Firstname is required'
    },
    validate: {
      validator: (v) => /^[a-zA-Z]([a-zA-Z-.\s]?)+$/.test(v),
      message: 'Firstname should have alphabetic characters without numbers'
    }
  },
  lastname: {
    type: String,
    text: true,
    required: {
      value: true,
      message: 'Lastname is required'
    },
    validate: {
      validator: (v) => /^[a-zA-Z]([a-zA-Z-.\s]?)+$/.test(v),
      message: 'Lastname should have only alphabetic characters without numbers'
    }
  },
  email: {
    type: String,
    text: true,
    set: (value) => value.toLowerCase(),
    required: {
      value: true,
      message: 'Email is required'
    },
    unique: 'Two users cannot have the same email - {VALUE}',
    validate: {
      validator: (v) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v),
      message: 'Email is invalid'
    }
  },
  role: {
    type: String,
    set: (value) => value.toLowerCase(),
    enum: {
      values: ['artist', 'designer', 'art manager'],
      message: 'Please use valid role name. Role \'{VALUE}\' is invalid'
    },
    required: {
      value: true,
      message: 'Role is required'
    },
  }
})

userSchema.plugin(beautifulUnique);

userSchema.index({ firstname: "text" })
userSchema.index({ lastname: "text" })
userSchema.index({ email: "text" })

const User = new mongoose.model('User', userSchema);

module.exports = { User };
