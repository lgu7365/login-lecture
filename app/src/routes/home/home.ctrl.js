const users = {
  id: ["abc", "def", "qwer"],
  passward: ["123", "456", "123456"],
}

const output = {
  home: (req, res) => {
    res.render("home/index");
  },
  
  login: (req, res) => {
    res.render("home/login");
  },
}

const process = {
  login: (req, res) => {
    const id = req.body.id,
      passward = req.body.passward;
      
    if(users.id.includes(id)){
      const idx = users.id.indexOf(id);
      if(users.passward[idx] === passward){
        return res.json({
          success: true,
        })
      }
    }
    return res.json({
      success: false,
      msg: "로그인에 실패하였습니다.",
    })    
  }
}

module.exports = {
  output,
  process,
};