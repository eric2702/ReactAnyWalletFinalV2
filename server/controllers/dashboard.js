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

exports.getUserId = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
};

exports.postTransaction = async (req, res, next) => {
  try {
    const { details, nominal, category_id, user_id } = req.body;
    if (nominal <= 0) {
      return res.json("error_nominal");
    }

    const newTransaction = await pool.query(
      "INSERT INTO transactions (details, nominal, category_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [details, nominal, category_id, user_id]
    );
    return res.json("Transaction Added Successfully!");
  } catch (err) {
    console.error(err.message);
    res.json("error_data_type");
  }
};

exports.getTransaction = async (req, res, next) => {
  try {
    const transactions = await pool.query(
      "SELECT transaction_id, details, nominal, c.category_name, to_char(date_created_updated, 'Day, dd Month yyyy, hh24:mi') as date_created_updated FROM transactions t JOIN categories c on (t.category_id = c.category_id) WHERE user_id = $1",
      [req.user]
    );

    res.json(transactions.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
};

exports.postDelete = async (req, res, next) => {
  try {
    const deleteID = req.params.transaction_id;

    const deleteTransaction = await pool.query(
      "DELETE FROM transactions WHERE transaction_id = $1",
      [deleteID]
    );
    return res.json("Transaction Deleted Successfully!");
  } catch (err) {
    console.error(err.message);
    res.json("error_id");
  }
};
