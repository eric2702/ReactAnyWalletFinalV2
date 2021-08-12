import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
import Navbar from "./partials/Navbar";
import "../css/dash.css";
const axios = require("axios");

const Dashboard = () => {
  const [name, setName] = useState("");
  const [dateString, setDateString] = useState("");
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
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [sort, setSort] = useState("date");
  const [ascDsc, setAscDsc] = useState("descending");
  const [editMode, setEditMode] = useState(0);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = transactions.slice(indexOfFirstPost, indexOfLastPost);

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
    category_name_filter: "",
    date_from_filter: "",
    date_to_filter: "",
    nominal_from_filter: "",
    nominal_to_filter: "",
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

      var parseRes = response.data;

      if (filter.details_filter !== "") {
        parseRes = parseRes.filter(function (array) {
          return array.details
            .toUpperCase()
            .includes(filter.details_filter.toUpperCase());
        });
      }
      if (filter.nominal_from_filter !== "") {
        parseRes = parseRes.filter(function (array) {
          return array.nominal >= parseInt(filter.nominal_from_filter);
        });
      }
      if (filter.nominal_to_filter !== "") {
        parseRes = parseRes.filter(function (array) {
          return array.nominal <= parseInt(filter.nominal_to_filter);
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
      if (filter.date_from_filter !== "") {
        parseRes = parseRes.filter(function (array) {
          return (
            array.date_created_updated_raw.substring(0, 10) >=
            filter.date_from_filter
          );
        });
      }
      if (filter.date_to_filter !== "") {
        parseRes = parseRes.filter(function (array) {
          return (
            array.date_created_updated_raw.substring(0, 10) <=
            filter.date_to_filter
          );
        });
      }
      if (sort === "sort_nominal") {
        parseRes.sort(function (a, b) {
          return parseFloat(b.nominal) - parseFloat(a.nominal);
        });
      }
      if (sort === "sort_details") {
        parseRes.sort(function (a, b) {
          return b.details.localeCompare(a.details);
        });
      }
      if (ascDsc === "ascending") {
        parseRes = parseRes.reverse();
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
    body.nominal = parseFloat(nominal);

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
        toast.error("Masukkan Nominal Lebih dari 0 tanpa desimal!");
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
    body.nominal_edit = parseFloat(nominal_edit);

    try {
      const response = await axios.post(url_edit, body, {
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = response.data;

      if (parseRes === "error_nominal") {
        toast.error("Masukkan Nominal Lebih dari 0 tanpa desimal!");
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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getName();
    getTransaction();
    getDateString();
    setCurrentPage(1);
  }, [filter, sort, ascDsc]);
  return (
    //AMOUNT
    <div className="dash-bg">
      <Navbar name={name} />
      <div className="container mt-4 pl-0">
        <div className="row col-12 m-0 p-0">
          <div className="col-1"></div>
          <div className="col-sm-3 pl-2 pl-sm-0">
            <p style={{ fontWeight: "bold" }}>{dateString}</p>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <div className="card bg-primary">
              <div className="card-body text-white">
                <h5 className="card-title">Balance</h5>
                <p className="card-text nominal-font">{amount.balance}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-success">
              <div className="card-body text-white">
                <h5 className="card-title">Income</h5>
                <p className="card-text nominal-font">{amount.income}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-danger">
              <div className="card-body text-white">
                <h5 className="card-title">Expense</h5>
                <p className="card-text nominal-font">{amount.expense}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TRANSACTIONS */}
      <div className="container mt-4">
        <div className="row col-12 m-0 p-0">
          <div className="col-sm-9 d-flex justify-content-end">
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
                  <div className="modal-content modal-border">
                    <div className="modal-header bg-success">
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
                                <select
                                  class="form-control"
                                  style={{cursor:"pointer"}}
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
                                  step="1000"
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
        <div class="row justify-content-center">
          <div class="border col-12 col-md-10 mt-3 rounded">
            <div class="pl-0 input-group rounded col-12 mt-3">
              <label
                className="text-white col-2 col-md-1 d-flex justify-content-center"
                htmlFor="date_from_filter"
              >
                From:{" "}
              </label>
              <input
                type="date"
                class="form-control rounded col-5 col-md-3"
                name="date_from_filter"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={filter.date_from_filter}
                onChange={handleFilterChange}
              />
              <input
                type="number"
                name="nominal_from_filter"
                step="1000"
                value={filter.nominal_from_filter}
                class="form-control rounded col-5 col-md-4 ml-1"
                placeholder="MIN Nominal"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={handleFilterChange}
              />
              <select
                class="form-control rounded d-none d-md-block col-4 ml-1"
                name="category_name_filter"
                style={{cursor:"pointer"}}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={filter.category_name_filter}
                onChange={handleFilterChange}
              >
                <option value="">Income & Expense</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div class="pl-0 input-group rounded col-12 mt-3">
              <label
                className="text-white col-2 col-md-1 d-flex justify-content-center"
                htmlFor="date_from_filter"
              >
                To:{" "}
              </label>
              <input
                type="date"
                class="form-control col-5 col-md-3 rounded col-3"
                name="date_to_filter"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={filter.date_to_filter}
                onChange={handleFilterChange}
              />

              <input
                type="number"
                step="1000"
                name="nominal_to_filter"
                value={filter.nominal_to_filter}
                class="form-control rounded ml-1 col-5 col-md-4"
                placeholder="MAX Nominal"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={handleFilterChange}
              />
              <input
                type="search"
                name="details_filter"
                value={filter.details_filter}
                class="form-control rounded d-none d-md-block col-4 ml-1"
                placeholder="Search Details"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={handleFilterChange}
              />
            </div>
            <div class="pl-0 input-group rounded col-12 mt-3 mt-md-0">
              <div class="col-2 col-md-1"></div>
              <input
                type="search"
                name="details_filter"
                value={filter.details_filter}
                class="form-control d-md-none d-block rounded col-6"
                placeholder="Search Details"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={handleFilterChange}
              />
              <select
                class="form-control d-md-none d-block col-6 rounded ml-1"
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
            </div>
            <div class="pl-0 input-group rounded col-12 mt-3">
              <div class="col-2 col-md-1"></div>
              <div class="input-group rounded col-10 col-md-11 pl-0">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => {
                    setFilter({
                      details_filter: "",
                      category_name_filter: "",
                      date_from_filter: "",
                      date_to_filter: "",
                      nominal_from_filter: "",
                      nominal_to_filter: "",
                    });
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row pr-0 mr-0 mt-4 container">
          <div className="col-md-1"></div>
          <div className="col-md-5 d-flex">
            <button
              type="button"
              className={
                "btn mx-1 " +
                (ascDsc === "ascending" ? "btn-warning" : "btn-secondary")
              }
              onClick={(e) => {
                if (ascDsc === "ascending") {
                  setAscDsc("descending");
                } else {
                  setAscDsc("ascending");
                }
              }}
            >
              {ascDsc === "ascending" ? "↑≡" : "↓≡"}
            </button>
            <select
              class="form-control rounded mx-1"
              name="sort"
              style={{cursor:"pointer"}}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="sort_date">Sort By (Date)</option>
              <option value="sort_nominal">Sort By (Nominal)</option>
              <option value="sort_details">Sort By (Details)</option>
            </select>
            <select
              class="form-control rounded mx-1"
              name="postsPerPage"
              style={{cursor:"pointer"}}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={postsPerPage}
              onChange={(e) => setPostsPerPage(e.target.value)}
            >
              <option value={5}>Trans/Page (5)</option>
              <option value={8}>Trans/Page (8)</option>
              <option value={10}>Trans/Page (10)</option>
              <option value={15}>Trans/Page (15)</option>
              <option value={20}>Trans/Page (20)</option>
            </select>
          </div>
          <div className="col-md-5 mt-2 mt-md-0 d-flex justify-content-end">
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
              className={
                "btn mx-1 " + (editMode === 0 ? "btn-info" : "btn-secondary")
              }
              onClick={(e) => {
                if (actionDisplay === "none") {
                  setActionDisplay("");
                  setEditMode(1);
                } else {
                  setActionDisplay("none");
                  setEditMode(0);
                }
              }}
            >
              {editMode === 0 ? "Edit" : "Cancel Edit"}
            </button>
          </div>
          <div className="col-md-1"></div>
        </div>

        <div className="row mt-4 container m-0 justify-content-center">
          <table
            className="table table-bordered col-11"
            id="dataTable"
            width="100%"
          >
            <thead className="thead-dark">
              <tr>
                <th className="text-center">Date & Time</th>
                <th className="text-center">Nominal</th>
                <th className="text-center">Category</th>
                <th className="text-center">Details</th>
                <th className="text-center" style={{ display: actionDisplay }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((transaction, index) => (
                <tr key={index}>
                  <td className="text-center">
                    {transaction.date_created_updated}
                  </td>

                  <td className="text-right">
                    {formatRupiah(transaction.nominal)}
                  </td>
                  <td
                    className={
                      "text-center text-white " +
                      (transaction.category_name === "Income"
                        ? "bg-success"
                        : "bg-danger")
                    }
                  >
                    {transaction.category_name}
                  </td>
                  <td className="text-center">{transaction.details}</td>

                  <td
                    className="text-center"
                    style={{ display: actionDisplay }}
                  >
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
                        <div className="modal-content modal-border">
                          <div className="modal-header bg-warning">
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
                                        step="1000"
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={transactions.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Dashboard;
