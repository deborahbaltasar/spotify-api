const User = require("../models/User");
const { error } = require("../../errors/Error");

class UserController{
  async store(req, res) {
    User.create({...req.body}).then(user => {
      return res.status(201).json({ data: user });
    }).catch(e => {
      if (e.code === 11000) {
        const keyName = Object.keys(e.keyValue);

        return error(400, "alreadyExists", res, "usuário", `${keyName}`);
        
      } else if (e.errors) {
        const keyName = Object.keys(e.errors)
        return res.status(400).json({ 
          message: e.errors[keyName[0]].properties.message,
          errors: e.errors
        });
      } else {
        return error(500, "internalCreation", res)
      }
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findById(id).select( "_id name email phone registration birth avatar")

    if(!user) {
      return error(404, "notFound", res, "Usuário");
    }

    return res.json({ data: user });   
  }

  async index(req, res) {
    const users = await User.paginate(
      req.query, 
      { 
        ...req.options, 
        select: "_id name username email"
      },
    );
    return res.json({
      data: users.docs,
      total: users.totalDocs
    });
  }

  async remove(req, res) {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id).select( "_id name email phone registration birth avatar");

    if(!user) {
      return error(404, "notFound", res, "Usuário");
    }

    return res.json({data: user});
  }

  async update(req, res) {
    const update = { 
      ...req.body, 
    }

    User.findByIdAndUpdate(req.userId, update, { new: true }).then(user => {
      if (!user) {
        return error(404, "notFound", res, "Usuário");
      }
  
      return res.json({ data: user })
    }).catch(e => {
  
      if (e.code === 11000) {
        const keyName = Object.keys(e.keyValue);

        return error(400, "alreadyExists", res, "usuário", `${keyName}`);
      } else {
        return error(500, "internalCreation", res)
      }
    });
  }
}

module.exports = new UserController();
