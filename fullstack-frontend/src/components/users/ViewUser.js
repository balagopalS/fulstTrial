import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  //hooks
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  };
  //component body
  return (
    <div class="center-div" className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>
          <div className="card">
            <div className="card-header">
              <ul className="list-group list-group-flush rounded">
                <li className="list-group-item mt-2">
                  <b>ID : </b>
                  {user.id}
                </li>
                <li className="list-group-item mt-2">
                  <b>Name : </b>
                  {user.name}
                </li>
                <li className="list-group-item mt-2">
                  <b>Username : </b>
                  {user.username}
                </li>
                <li className="list-group-item mt-2">
                  <b>Email : </b>
                  {user.email}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
