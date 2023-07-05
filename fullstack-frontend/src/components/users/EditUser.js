import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  //hooks
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  let navigate = useNavigate();
  //deconstructing the user object
  const { name, username, email } = user;
  //for getting id from url parameter
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  //input method
  const onInput = (e) => {
    // using spread operator as only one field is changed
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  //submit method for putting to db (edit)
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/userUpdate/${id}`, user);
    navigate("/");
  };
  //finding the user
  const loadUser = async (e) => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            {/* name field */}
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name="name"
                value={name}
                onChange={(e) => onInput(e)}
              ></input>
            </div>
            {/* username field */}
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Userame"
                name="username"
                value={username}
                onChange={(e) => onInput(e)}
              ></input>
            </div>
            {/* email field */}
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={(e) => onInput(e)}
              ></input>
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
