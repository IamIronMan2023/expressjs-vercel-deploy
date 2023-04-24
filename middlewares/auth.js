const jwt = require("jsonwebtoken");
const db = require("../database");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); //Unauthrorized
  }

  jwt.verify(token, process.env.AUTH_TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      let exists = await access_token_exists(token);
      if (!exists) {
        return res.sendStatus(403);
      }
    }

    req.user = user;
    next();
  });
};

const access_token_exists = async (token) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM users_access_tokens WHERE access_token = ?",
      [token]
    );
    return rows.length > 0;
  } catch (error) {
    throw error;
  }
};

module.exports = auth;
