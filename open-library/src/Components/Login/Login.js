import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../axios/endpoints";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const res = await loginUser(formData);
      // console.log(res);
      if (res.status === 200) {
        localStorage.setItem("@tk", res.data.token);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("name", res.data.name);
        toast.success(res.data.message);
        navigate("/", { replace: true });
      } else {
        toast.error(e.response.data.message);
      }
    } catch (e) {
      console.log(e);
      if (e.response) {
        toast.error(e.response.data.message);
      }
    }
  };

  return (
    <div className="base">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form className="base_container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="name@example.com"
            required
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <p className="text-muted my-3">
          Do not have an account ? <Link to="/signup">Signup here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
