const labels = require('../labels');

module.exports = {
  error: (code, message, res, entity, keyName) => {
    res.status(code).json({
      message: labels.ptBR.errors[message](entity, keyName)
    });
  },
};
