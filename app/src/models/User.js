const UserStorage = require("./UserStorage");

class User {
  constructor(body){
    this.body = body;
  }

  async login() {
    const body = this.body;
    const {id, psword} = await UserStorage.getUserInfo(body.id);
    if(id){
      if(id === body.id && psword === body.passward){
        return {success: true};
      } 
      return {success: false, msg: "비밀번호가 틀렸습니다."};
    }
    return {success: false, msg: "존재하지 않는 아이디입니다."};
  }

  register() {
    const client = this.body;
    UserStorage.save(client);
  }
}

module.exports = User;