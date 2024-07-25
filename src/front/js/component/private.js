import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Private = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("jwt-token");
    if (!token) {
      navigate("https://bug-free-spoon-pjjwxjgxj5rq27wxp-3001.app.github.dev/login");
      return;
    }

    const fetchUser = async () => {
      const resp = await fetch(
        "/private",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        setUser(data);
      } else {
        sessionStorage.removeItem("jwt-token");
        navigate("login");
      }
    };
    fetchUser();
  }, [navigate]);

  if (!user) {
    return <div>CARGANDO... </div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="row">
          <h1>Welcome {user.email}</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              sessionStorage.removeItem("jwt-token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Private;