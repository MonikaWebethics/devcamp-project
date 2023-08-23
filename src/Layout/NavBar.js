import React, { useEffect, useState } from "react";
import logo from "assets/Images/red-304573_1280.png";
import { useAxios } from "helpers/useAxios";
import { removeToken } from "Utility/token";
import { useNavigate, NavLink } from "react-router-dom";
export function NavBar() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const logout = () => {
    removeToken();
    navigate("/login");
  };
  useEffect(() => {
    async function getData() {
      try {
        const response = await useAxios.get("/auth/me");
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <img src={logo} height="28" alt="CoolBrand" />
        </NavLink>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav">
            <NavLink to="/" className="nav-item nav-link">
              BootCamp
            </NavLink>
          </div>
          <div className="navbar-nav ms-auto">
            <div className="pe-5 pt-2">
              <h5>{data.name}</h5>
            </div>
            <button onClick={logout} className="nav-item nav-link">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
