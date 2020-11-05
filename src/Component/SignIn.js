import React, { useState } from "react";
import { useFormik } from "formik";
import { NavLink, useHistory } from "react-router-dom";
import "./SignIn.css";
import { auth } from "../firebase";
import { MoonLoader } from "react-spinners";

function SignIn() {
  const initialValues = {
    email: "",
    password: "",
  };
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const onSubmit = (values) => {
    setLoader(true);
    const { email, password } = values;
    auth
      .signInWithEmailAndPassword(email, password)
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
        <h1>Sign-In Here!</h1>
        <br></br>
        <MoonLoader color="blue" loading={loader}></MoonLoader>
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
          <button>SIGN IN</button>
        </div>
        <br />
        <NavLink to="/register">
          <strong> Do not have an accoun? No worries.. Register here!</strong>
        </NavLink>
      </div>
    </form>
  );
}

export default SignIn;
