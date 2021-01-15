const connection = require('../config/connection');

class CrudDao {
  static table;

  /**
   * This function return a promise.
   * Data is a object with a property and his value to verify
   * exemples:
   *
   *  { email: 'John@exemple.com' }
   *
   *  { id: 2}
   *
   * @param {object} data
   * @return {promise} A promise to be resolved with the SQL query or rejected with an error
   */
  static findOne(data) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${this.table} WHERE ?`;

      connection.query(sql, [data], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  /**
   * This function return a promise.
   * Data is a object with properties and their value to create
   * exemples:
   *
   * { firstname: 'John', email: 'John@exemple.com', password: 'doe' }
   *
   * @param {object} data
   * @return {promise} A promise to be resolved with the SQL query or rejected with an error.
   */
  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${this.table} SET ?`;

      connection.query(sql, [data], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = CrudDao;
