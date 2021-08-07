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
    const { details, nominal, category_id, date_created_updated, user_id } =
      req.body;

    if (nominal <= 0 || nominal.toString().includes(".")) {
      return res.json("error_nominal");
    }

    const newTransaction = await pool.query(
      "INSERT INTO transactions (details, nominal, category_id, date_created_updated, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [details, nominal, category_id, date_created_updated, user_id]
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
      "SELECT transaction_id, details, nominal, c.category_name, date_created_updated as date_created_updated_raw, to_char(date_created_updated, 'Day, dd Month yyyy, hh24:mi') as date_created_updated FROM transactions t JOIN categories c on (t.category_id = c.category_id) WHERE user_id = $1 ORDER BY t.date_created_updated DESC",
      [req.user]
    );
    res.json(transactions.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
};

exports.getEditTransaction = async (req, res, next) => {
  try {
    const editID = req.params.transaction_id;
    const transactions = await pool.query(
      "SELECT details as details_edit, nominal as nominal_edit, category_id as category_id_edit, transaction_id as transaction_id_edit, CONCAT(to_char(date_created_updated, 'YYYY-MM-DDT'), to_char(date_created_updated, 'HH24:MI')) as date_created_updated_edit FROM transactions WHERE transaction_id = $1",
      [editID]
    );
    res.json(transactions.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
};

exports.postEditTransaction = async (req, res, next) => {
  try {
    const {
      details_edit,
      nominal_edit,
      category_id_edit,
      date_created_updated_edit,
      transaction_id_edit,
    } = req.body;

    if (nominal_edit <= 0 || nominal_edit.toString().includes(".")) {
      return res.json("error_nominal");
    }

    const editTransaction = await pool.query(
      "UPDATE transactions SET details = $1, nominal = $2, category_id = $3, date_created_updated = $4 WHERE transaction_id = $5 RETURNING *",
      [
        details_edit,
        nominal_edit,
        category_id_edit,
        date_created_updated_edit,
        transaction_id_edit,
      ]
    );
    return res.json("Transaction Edited Successfully!");
  } catch (err) {
    console.error(err.message);
    res.json("error_data_type");
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
