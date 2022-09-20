const fs = require("fs").promises;

class UserStorage {
  static #getUserInfo(id, data) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users);
    const userInfo = usersKeys.reduce((newUsers, info) => {
      newUsers[info] = users[info][idx];
      return newUsers;
    }, {});
    return userInfo;
  }
  
  static #getUsers(fields, isAll, data) {
    const users = JSON.parse(data);
    if(isAll) return users;

    const newUsers = fields.reduce((newUsers, field) => {
      if(users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {})
    return newUsers;
  }

  static getUsers(isAll, ...fields) {
    return fs.readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUsers(fields, isAll, data);
      })
      .catch(console.error);
  }

  static getUserInfo(id) {
    return fs.readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUserInfo(id, data);
      })
      .catch(console.error);
  }

  static async save(userInfo) {
    const users = await this.getUsers(true);
    if (users.id.includes(userInfo.id)) {
      throw '이미 존재하는 아이디입니다.';
    }
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.psword.push(userInfo.password);
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));
    return {success: true};
  }
}

module.exports = UserStorage;