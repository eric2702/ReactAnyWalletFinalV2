import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { authActions } from "../store/auth";
const axios = require("axios");

const Dashboard = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  const [name, setName] = useState("");
  const [dateString, setDateString] = useState("");
  const [yearsAvailable, setYearsAvailable] = useState([]);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [transactions, setTransactions] = useState([{}]);

  const [amount, setAmount] = useState({});
  const [actionDisplay, setActionDisplay] = useState("none");

  const [formData, setFormData] = useState({
    details: "",
    category_id: "",
    nominal: "",
    date_created_updated: "",
  });

  const [formEditData, setFormEditData] = useState({
    details_edit: "",
    category_id_edit: "",
    nominal_edit: "",
    date_created_updated_edit: "",
    transaction_id_edit: "",
  });

  const [filter, setFilter] = useState({
    details_filter: "",
    nominal_filter: -1,
    category_name_filter: "",
    year_filter: "",
  });

  const { details, category_id, nominal, date_created_updated } = formData;
  const {
    details_edit,
    category_id_edit,
    nominal_edit,
    transaction_id_edit,
    date_created_updated_edit,
  } = formEditData;

  function formatRupiah(numb) {
    try {
      const format = numb.toString().split("").reverse().join("");
      const convert = format.match(/\d{1,3}/g);
      let rupiah;
      if (numb >= 0) {
        rupiah = "Rp " + convert.join(".").split("").reverse().join("");
      } else {
        rupiah = "Rp -" + convert.join(".").split("").reverse().join("");
      }
      return rupiah;
    } catch (err) {
      console.error(err.message);
    }
  }

  function handleChange(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleEditChange(e) {
    let data = { ...formEditData };
    data[e.target.name] = e.target.value;
    setFormEditData(data);
  }

  function handleFilterChange(e) {
    let data = { ...filter };
    data[e.target.name] = e.target.value;
    setFilter(data);
  }

  async function getName() {
    try {
      const response = await axios.get("http://localhost:5000/dashboard/", {
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = response.data;

      setName(parseRes.name);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getTransaction() {
    try {
      const response = await axios.get(
        "http://localhost:5000/dashboard/get_trans",
        {
          headers: {
            token: localStorage.token,
          },
        }
      );
      const response_year = await axios.get(
        "http://localhost:5000/dashboard/get_years",
        {
          headers: {
            token: localStorage.token,
          },
        }
      );

      var parseRes = response.data;
      setYearsAvailable(response_year.data);
      console.log(yearsAvailable);
      if (filter.details_filter !== "") {
        parseRes = parseRes.filter(function (array) {
          return (
            array.details
              .toUpperCase()
              .includes(filter.details_filter.toUpperCase()) ||
            array.nominal === filter.details_filter ||
            array.category_name
              .toUpperCase()
              .includes(filter.details_filter.toUpperCase()) ||
            array.date_created_updated
              .toUpperCase()
              .includes(filter.details_filter.toUpperCase())
          );
        });
      }

      if (filter.category_name_filter !== "") {
        parseRes = parseRes.filter(function (array) {
          return (
            array.category_name.toUpperCase() ===
            filter.category_name_filter.toUpperCase()
          );
        });
      }

      if (filter.year_filter !== "") {
        parseRes = parseRes.filter(function (array) {
          return array.date_created_updated.includes(filter.year_filter);
        });
      }

      setTransactions(parseRes);
      let income = 0;
      let expense = 0;
      for (let i = 0; i < parseRes.length; i++) {
        if (parseRes[i].category_name === "Income") {
          income = income + parseInt(parseRes[i].nominal);
        } else if (parseRes[i].category_name === "Expense") {
          expense = expense + parseInt(parseRes[i].nominal);
        }
      }
      let balance = income - expense;

      setAmount({
        balance: formatRupiah(balance),
        income: formatRupiah(income),
        expense: formatRupiah(expense),
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  async function deleteTransaction(e) {
    try {
      let url_delete =
        "http://localhost:5000/dashboard/del_trans/" + e.target.value;
      const response = await axios.get(url_delete, {
        headers: {
          token: localStorage.token,
        },
      });
      let parseRes = response.data;
      if (parseRes === "error_id") {
        toast.error("Delete failed!");
      }
      toast.success("Transaction Deleted Successfully!");
      getTransaction();
    } catch (err) {
      console.error(err.message);
      toast.error("Server Error");
    }
  }

  async function getDateString() {
    try {
      let dateNow = new Date();
      let now =
        days[dateNow.getDay()] +
        ", " +
        dateNow.getDate().toString() +
        " " +
        monthNames[dateNow.getMonth()] +
        " " +
        dateNow.getFullYear().toString();
      setDateString(now);
    } catch (err) {
      console.error(err.message);
    }
  }

  const onAddTransaction = async (e) => {
    e.preventDefault();

    const responseUserId = await axios.get(
      "http://localhost:5000/dashboard/user_id",
      {
        headers: {
          token: localStorage.token,
        },
      }
    );

    const user_id = responseUserId.data;
    const body = {
      details,
      nominal,
      category_id,
      user_id,
      date_created_updated,
    };
    body.category_id = parseInt(category_id);
    body.nominal = parseInt(nominal);

    try {
      const response = await axios.post(
        "http://localhost:5000/dashboard/",
        body,
        {
          headers: {
            token: localStorage.token,
          },
        }
      );

      const parseRes = response.data;

      if (parseRes === "error_nominal") {
        toast.error("Masukkan Nominal Lebih dari 0!");
      } else if (parseRes === "error_data_type") {
        toast.error("Masukkan Data dengan Lengkap!");
      } else {
        toast.success("Transaction Added Successfully!");
        setFormData({
          details: "",
          category_id: "",
          nominal: "",
          date_created_updated: "",
        });
        e.preventDefault();
        getTransaction();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const onEditTransaction = async (e) => {
    e.preventDefault();

    let url_edit = "http://localhost:5000/dashboard/edit_trans/submit";

    const body = {
      details_edit,
      nominal_edit,
      category_id_edit,
      transaction_id_edit,
      date_created_updated_edit,
    };
    body.category_id_edit = parseInt(category_id_edit);
    body.nominal_edit = parseInt(nominal_edit);

    try {
      const response = await axios.post(url_edit, body, {
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = response.data;

      if (parseRes === "error_nominal") {
        toast.error("Masukkan Nominal Lebih dari 0!");
      } else if (parseRes === "error_data_type") {
        toast.error("Masukkan Data dengan Lengkap!");
      } else {
        toast.success(parseRes);
        e.preventDefault();
        getTransaction();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getEditTransaction = async (e) => {
    e.preventDefault();
    try {
      let url_get_edit =
        "http://localhost:5000/dashboard/edit_trans/" + e.target.value;
      const responseEdit = await axios.get(url_get_edit, {
        headers: {
          token: localStorage.token,
        },
      });
      setFormEditData(responseEdit.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    logoutHandler();
    toast.error("Logged out successfully");
  };

  useEffect(() => {
    getName();
    getTransaction();
    getDateString();
  }, [filter]);
  return (
    //AMOUNT
    <div>
      <h1 className="d-flex">Dashboard {name}</h1>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body text-primary">
                <h5 className="card-title">Balance</h5>
                <p className="card-text">{amount.balance}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body text-success">
                <h5 className="card-title">Income</h5>
                <p className="card-text">{amount.income}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body text-danger">
                <h5 className="card-title">Expense</h5>
                <p className="card-text">{amount.expense}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TRANSACTIONS */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-2">
            <p style={{ fontWeight: "bold" }}>{dateString}</p>
          </div>
          {/* <div className="col-sm-3"></div> */}
          <div className="col-sm-8 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-success mx-1"
              data-toggle="modal"
              data-target="#staticBackdrop"
            >
              Add Transaction
            </button>
            <button
              type="button"
              className="btn btn-info mx-1"
              onClick={(e) => {
                if (actionDisplay === "none") {
                  setActionDisplay("");
                } else {
                  setActionDisplay("none");
                }
              }}
            >
              Edit
            </button>
            <div
              className="modal fade"
              id="staticBackdrop"
              data-backdrop="static"
              data-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <form onSubmit={onAddTransaction}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="staticBackdropLabel">
                        Add Transaction
                      </h5>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-4">
                          <div className="card">
                            <div className="mx-3 my-2">
                              <p className="card-title small font-weight-light m-0">
                                Wallet
                              </p>
                              <span className="font-weight-bolder">{name}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="card">
                            <div className="mx-3 my-2">
                              <p className="card-title small font-weight-light m-0">
                                Category
                              </p>
                              <div class="input-group input-group-sm m-0">
                                {/* <input
                                  type="number"
                                  name="category_id"
                                  className="form-control border-0"
                                  aria-label="Sizing example input"
                                  aria-describedby="inputGroup-sizing-sm"
                                  placeholder="input category"
                                  value={formData.category_id}
                                  onChange={handleChange}
                                /> */}
                                <select
                                  class="form-control"
                                  name="category_id"
                                  aria-label="Sizing example input"
                                  aria-describedby="inputGroup-sizing-sm"
                                  value={formData.category_id}
                                  onChange={handleChange}
                                >
                                  <option value="0">Select Category</option>
                                  <option value="1">Income</option>
                                  <option value="2">Expense</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="card m-0">
                            <div className="mx-3 my-1">
                              <p className="card-title small font-weight-light m-0">
                                Nominal
                              </p>
                              <div className="input-group input-group-sm m-0">
                                <input
                                  type="number"
                                  name="nominal"
                                  className="form-control border-0"
                                  aria-label="Sizing example input"
                                  aria-describedby="inputGroup-sizing-sm"
                                  placeholder="Isi Nominal Transaksi"
                                  value={formData.nominal}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row mt-4">
                        <div className="col-5">
                          <div className="card">
                            <div className="mx-3 my-2">
                              <p className="card-title small font-weight-light m-0">
                                Date
                              </p>
                              {/* <span className="font-weight-bolder">{dateString}</span> */}
                              <input
                                type="datetime-local"
                                name="date_created_updated"
                                className="form-control"
                                value={formData.date_created_updated}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-7">
                          <div className="card">
                            <div className="mx-3 my-2">
                              <p className="card-title small font-weight-light m-0">
                                Details
                              </p>
                              <div className="input-group input-group-sm m-0">
                                <input
                                  type="text"
                                  name="details"
                                  className="form-control border-0"
                                  aria-label="Sizing example input"
                                  aria-describedby="inputGroup-sizing-sm"
                                  placeholder="Isi Details Transaksi"
                                  value={formData.details}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="input-group rounded col-7">
          <input
            type="search"
            name="details_filter"
            value={filter.details_filter}
            class="form-control rounded col-5"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={handleFilterChange}
          />
          <span class="input-group-text border-0 mr-1" id="search-addon">
            <i class="fas fa-search"></i>
          </span>
          <select
            class="form-control rounded col-4"
            name="category_name_filter"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={filter.category_name_filter}
            onChange={handleFilterChange}
          >
            <option value="">Income & Expense</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <select
            class="form-control rounded ml-1 col-3"
            name="year_filter"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={filter.year_filter}
            onChange={handleFilterChange}
          >
            <option value="">All Years</option>
            {yearsAvailable.map((year) => (
              <option value={year.years_available}>
                {year.years_available}
              </option>
            ))}
          </select>
        </div>

        <div className="row mt-5 container">
          <table className="table table-bordered" id="dataTable" width="100%">
            <thead>
              <tr>
                <th>Details</th>
                <th>Nominal</th>
                <th>Category</th>
                <th>Date & Time</th>
                <th style={{ display: actionDisplay }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.details}</td>
                  <td>{formatRupiah(transaction.nominal)}</td>
                  <td>{transaction.category_name}</td>
                  <td>{transaction.date_created_updated}</td>
                  <td style={{ display: actionDisplay }}>
                    <button
                      className="btn btn-warning btn-circle btn-sm mx-1"
                      type="button"
                      data-toggle="modal"
                      data-target="#editForm"
                      value={transaction.transaction_id}
                      onClick={(e) => {
                        getEditTransaction(e);
                      }}
                    >
                      Edit
                    </button>
                    <div
                      className="modal fade"
                      id="editForm"
                      data-backdrop="static"
                      data-keyboard="false"
                      tabIndex="-1"
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg">
                        <form onSubmit={onEditTransaction}>
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="staticBackdropLabel"
                              >
                                Edit Transaction
                              </h5>
                            </div>
                            <div className="modal-body">
                              <div className="row">
                                <div className="col-4">
                                  <div className="card">
                                    <div className="mx-3 my-2">
                                      <p className="card-title small font-weight-light m-0">
                                        Wallet
                                      </p>
                                      <span className="font-weight-bolder">
                                        {name}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <div className="card">
                                    <div className="mx-3 my-2">
                                      <p className="card-title small font-weight-light m-0">
                                        Category
                                      </p>
                                      <div class="input-group input-group-sm m-0">
                                        <select
                                          class="form-control"
                                          name="category_id_edit"
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-sm"
                                          value={formEditData.category_id_edit}
                                          onChange={handleEditChange}
                                        >
                                          <option value="0">
                                            Select Category
                                          </option>
                                          <option value="1">Income</option>
                                          <option value="2">Expense</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <div className="card m-0">
                                    <div className="mx-3 my-1">
                                      <p className="card-title small font-weight-light m-0">
                                        Nominal
                                      </p>
                                      <div className="input-group input-group-sm m-0">
                                        <input
                                          type="number"
                                          name="nominal_edit"
                                          className="form-control border-0"
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-sm"
                                          placeholder="Isi Nominal Transaksi"
                                          value={formEditData.nominal_edit}
                                          onChange={handleEditChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="row mt-4">
                                <div className="col-5">
                                  <div className="card">
                                    <div className="mx-3 my-2">
                                      <p className="card-title small font-weight-light m-0">
                                        Date
                                      </p>
                                      {/* <span className="font-weight-bolder">{dateString}</span> */}
                                      <input
                                        type="datetime-local"
                                        name="date_created_updated_edit"
                                        className="form-control"
                                        value={
                                          formEditData.date_created_updated_edit
                                        }
                                        onChange={handleEditChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-7">
                                  <div className="card">
                                    <div className="mx-3 my-2">
                                      <p className="card-title small font-weight-light m-0">
                                        Details
                                      </p>
                                      <div className="input-group input-group-sm m-0">
                                        <input
                                          type="text"
                                          name="details_edit"
                                          className="form-control border-0"
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-sm"
                                          placeholder="Isi Details Transaksi"
                                          value={formEditData.details_edit}
                                          onChange={handleEditChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                              <button type="submit" className="btn btn-primary">
                                Save
                              </button>
                            </div>
                          </div>
                          <input
                            type="hidden"
                            name="transaction_id_edit"
                            value={formEditData.transaction_id_edit}
                          />
                        </form>
                      </div>
                    </div>
                    <button
                      value={transaction.transaction_id}
                      onClick={(e) => {
                        if (
                          window.confirm(
                            "Are you sure you wish to delete this transaction?"
                          )
                        )
                          deleteTransaction(e);
                      }}
                      className="btn btn-danger btn-circle btn-sm mx-1"
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
