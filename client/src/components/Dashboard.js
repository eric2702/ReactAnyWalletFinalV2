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
  const [transactions, setTransaction] = useState([
    {
      id: 1,
      details: "Gaji",
      category: "income",
      nominal: 6000000,
    },
  ]);

  const [formData, setFormData] = useState({
    details: "",
    category: "",
    nominal: "",
  });

  function handleChange(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let data = [...transactions];
    data.push({
      id: 1,
      details: formData.details,
      category: formData.category,
      nominal: formData.nominal,
    });
    setTransaction(data);
    setFormData({ details: "", category: "", nominal: "" });
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

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    logoutHandler();
    toast.error("Logged out successfully");
  };

  useEffect(() => {
    getName();
  }, []);
  return (
    <div>
      <h1>Dashboard {name}</h1>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-4">
            <p>28 Juli 2021</p>
          </div>
          <div className="col-sm-3"></div>
          <div className="col-sm-3">
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#staticBackdrop"
            >
              Add Transaction
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
                <form onSubmit={handleSubmit}>
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
                              <span className="font-weight-bolder">
                                UserName
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
                                <input
                                  type="text"
                                  name="category"
                                  className="form-control border-0"
                                  aria-label="Sizing example input"
                                  aria-describedby="inputGroup-sizing-sm"
                                  placeholder="input category"
                                  value={formData.category}
                                  onChange={handleChange}
                                />
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
                                  type="text"
                                  name="nominal"
                                  className="form-control border-0"
                                  aria-label="Sizing example input"
                                  aria-describedby="inputGroup-sizing-sm"
                                  placeholder="0"
                                  value={formData.nominal}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row mt-4">
                        <div className="col-4">
                          <div className="card">
                            <div className="mx-3 my-2">
                              <p className="card-title small font-weight-light m-0">
                                Date
                              </p>
                              <span className="font-weight-bolder">
                                28 Juli 2021
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-8">
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
                                  placeholder="Isi Details Transaction"
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
        <div className="row mt-5 container">
          <table className="table table-bordered" id="dataTable" width="100%">
            <thead>
              <tr>
                <th>ID</th>
                <th>Details</th>
                <th>Nominal</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.id}</td>
                  <td>{transaction.details}</td>
                  <td>{transaction.nominal}</td>
                  <td>{transaction.category}</td>
                  <td>
                    <button className="btn btn-warning btn-circle btn-sm m-0">
                      Edit
                    </button>
                    <button className="btn btn-danger btn-circle btn-sm mx-2">
                      Del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
