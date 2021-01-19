const CrudDao = require('./CrudDao');

class User extends CrudDao {
  static table = 'initiator';
}

module.exports = User;
