const usersModel = require("../users/users-model");

function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  let timestamp = new Date().toLocaleString();
  let url = req.originalUrl;
  let method = req.method;

  console.log(`${timestamp} -- ${method} -- ${url} `);
  next();
}

async function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    const user = await usersModel.getById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else {
      req.currentUser = user;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    let { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "gerekli name alanı eksik" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    let { text } = req.body;
    if (!text) {
      res.status(400).json({ message: "gerekli text alanı eksik" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
