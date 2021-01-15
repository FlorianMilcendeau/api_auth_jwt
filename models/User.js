const CrudDao = require('./CrudDao');

class User extends CrudDao {
  static table = 'user';
}

module.exports = User;
