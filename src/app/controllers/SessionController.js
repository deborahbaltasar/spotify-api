const User = require("../models/User");
const { error } = require("../../errors/Error");

class SessionController {
  async create(req, res) {
    const {username, password} = req.body;
    
    const user = await User.findOne({ username });

    if(!user) {
      return error(404, "notFound", res, 'Usuário');
    }

    if(!(await user.compareHash(password))) {
        return error(401, "wrongPassword", res, "password");
    }

    const { id, name, email } = user;

    return res.json({
        user: {
            id,
            name,
            username,
            email,
        },
        token: user.generateToken()
    });
  }
}

module.exports = new SessionController();
