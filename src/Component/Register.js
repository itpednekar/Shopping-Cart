import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import "./SignIn.css";
import { auth } from "../firebase.js";
import { MoonLoader } from "react-spinners";

function Register() {
  const initialValues = {
    email: "",
    password: "",
  };
  const history = useHistory();
  const [loader, setLoader] = useState(false);

  const onSubmit = (values) => {
    const { email, password } = values;
    setLoader(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          setLoader(false);
          history.push("/");
        }
      })
      .catch((error) => {
        setLoader(false);
        alert(error.message);
      });
  };
  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is Required";
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        values.email
      )
    ) {
      errors.email = "Please enter valid email!";
    }
    if (!values.password) {
      errors.password = "Password is Required!";
    } else if (values.password.length <= 6) {
      errors.password = "Password must be greater than 6 digits!";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="signIn">
        <h1>Register Here!</h1>
        <br></br>
        <div className="loader">
          <MoonLoader color="blue" loading={loader}></MoonLoader>
        </div>
        <br></br>
        <input
          placeholder="Email"
          name="email"
          id="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div
            style={{ color: "red", marginBottom: "10px", marginLeft: "10px" }}
          >
            {formik.errors.email}
          </div>
        )}

        <input
          placeholder="Password"
          name="password"
          id="password"
          type="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <div
            style={{ color: "red", marginBottom: "10px", marginLeft: "10px" }}
          >
            {formik.errors.password}
          </div>
        )}
        <div>
          <button>REGISTER</button>
        </div>
        <br />
        <NavLink to="/sign-In">
          <strong> Already have an accoun? Sign In here!</strong>
        </NavLink>
      </div>
    </form>
  );
}

export default Register;
