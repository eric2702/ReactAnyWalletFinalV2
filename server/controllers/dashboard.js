const pool = require("../db");

exports.getRoot = async (req, res, next) => {
  try {
    const user = await pool.query("SELECT name FROM users WHERE user_id = $1", [
      req.user,
    ]);

    res.json(user.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
};
