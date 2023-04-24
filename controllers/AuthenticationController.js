const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query(
      "SELECT id, password FROM users WHERE email = ?",
      [email]
    );

    if (!rows[0]) {
      return res.status(400).send("Invalid Credential");
    }

    let hashPassword = rows[0].password;
    let userId = rows[0].id;

    if (await bcrypt.compare(password, hashPassword)) {
      const accessToken = jwt.sign(email, process.env.AUTH_TOKEN_SECRET);
      saveToken(userId, accessToken);
      res.status(200).json({
        message: "Successfully authenticated",
        access_token: accessToken,
      });
    } else {
      res.status(400).json({ message: "Invalid Credential" });
    }
  } catch (error) {
    throw error;
  }
};

const saveToken = async (userId, access_token) => {
  await db.query(
    "INSERT INTO users_access_tokens (user_id, access_token) VALUES(?, ?)",
    [userId, access_token]
  );
};

const logoutUser = async (req, res) => {
  let user_id = req.body.user_id;
  let access_token = req.body.access_token;

  try {
    await db.query(
      "DELETE FROM users_access_tokens WHERE user_id = ? and access_token = ?",
      [user_id, access_token]
    );

    res.status(200).json({ message: "Log out successfully" });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginUser,
  logoutUser,
};
