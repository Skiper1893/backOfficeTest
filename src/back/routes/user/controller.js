const _ = require('lodash');
const { User } = require('./../../db/models/User');
const USER_FIELDS = require('./../../constants/user')
const ROLES = require('./../../constants/roles')
const ObjectId = require('mongoose').Types.ObjectId;
const { getFirstErrorMessage } = require('./../../handlers/errorMessages')

module.exports.getUsers = async (req, res, next) => {
  try {
    const options = { };
    const { search } = req.query;
    const { filter } = req.params;

    if (filter && filter !== 'all') {
      options.role = filter;
    }

    if(search) {
      options.$text = {
        $search: search,
        $caseSensitive: false
      }
    }

    const usersObject = await User.find(options).select('-__v');

    res.json({
      users: usersObject,
      message: 'Users returned'
    })
  } catch (e) {
    e.message = getFirstErrorMessage(e)
    next(e);
  }
}

module.exports.createUser = async (req, res, next) => {
  try {
    const fields = Object.values(USER_FIELDS);
    const userFields = _.pick(req.body, fields);
    if (userFields.role === ROLES.ART_MANAGER) {
      const checkArtManager = await User.findOne({ role: ROLES.ART_MANAGER });
      if (checkArtManager) {
        throw Error('Art manager already exist');
      }
    }
    const user = new User({ ...userFields });
    await user.save();
    const users = await User.find({}).select('-__v');

    res.json({
      message: 'New user successfully created',
      users
    })
  } catch (e) {
    e.message = getFirstErrorMessage(e)
    next(e);
  }
}

module.exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) throw Error('Id params is incorrect!');

    const fields = Object.values(USER_FIELDS);
    const userFields = _.pick(req.body, fields);
    const user = await User.findByIdAndUpdate(id, userFields, { returnOriginal: false, runValidators: true }).select('-__v');
    if (!user) throw Error('User not found');

    res.json({
      message: 'User successfully updated',
      user
    })
  } catch (e) {
    e.message = getFirstErrorMessage(e)
    next(e);
  }
}

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) throw Error('Id params is incorrect!');
    const user = await User.findById(id);
    if(!user) throw Error('User not found');
    await user.remove();

    res.json({
      message: 'User successfully deleted'
    })
  } catch (e) {
    e.message = getFirstErrorMessage(e)
    next(e);
  }
}
