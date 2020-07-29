const _ = require('lodash');
const USER_FIELDS = require('./../constants/user');

module.exports.getFirstErrorMessage = error => {
  const messages = _.pick(error.errors, _.values(USER_FIELDS));
  if (_.get(messages, [_.keys(messages)[0], 'properties', 'message'])) {
    return _.get(messages, [_.keys(messages)[0], 'properties', 'message']);
  }
  return error.message;
}
