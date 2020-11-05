import React, { useContext } from "react";
import "./PlaceOrder.css";
import { useFormik } from "formik";
import { CartContext } from "../App";
import { useHistory } from "react-router-dom";
import SignIn from "./SignIn";

function PlaceOrder() {
  const context = useContext(CartContext);
  const history = useHistory();
  const initialValues = {
    name: "",
    email: context.cartUserState ? context.cartUserState.email : "",
    mob: "",
    addr: "",
    creditNo: "",
  };
  const onSubmit = (values) => {
    alert("Order placed Successfully!");
    context.dispatchState({
      type: "clearCart",
    });
    history.push("/");
  };
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Name is Required!";
    } else if (
      !/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(values.name)
    ) {
      errors.name = "Please enter valid Name!";
    }

    if (!values.email) {
      errors.email = "Email is Required";
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        values.email
      )
    ) {
      errors.email = "Please enter valid email!";
    }
    if (!values.mob) {
      errors.mob = "Mobile No is Required!";
    } else if (isNaN(values.mob)) {
      errors.mob = "Please enter valid Mobile No!";
    } else if (values.mob.length !== 10) {
      errors.mob = "Mobile No must contain 10 digits!";
    }
    if (!values.addr) errors.addr = "Address is Required!";
    if (!values.creditNo) {
      errors.creditNo = "Credit Card No is Required!";
    } else if (isNaN(values.creditNo)) {
      errors.creditNo = "Please enter valid Credit Card No!";
    } else if (values.creditNo.length !== 16) {
      errors.creditNo = "Credit Card No must contain 16 digits!";
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
      <div>
        <div className="place__order">
          <h1>Order Summary</h1>
          <input
            placeholder="Name"
            name="name"
            id="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {formik.errors.name}
            </div>
          )}
          <input
            placeholder="Email"
            name="email"
            id="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {formik.errors.email}
            </div>
          )}
          <input
            placeholder="Mobile No"
            name="mob"
            id="mob"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.mob}
          />
          {formik.touched.mob && formik.errors.mob && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {formik.errors.mob}
            </div>
          )}
          <input
            placeholder="Address"
            name="addr"
            id="addr"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.addr}
          />
          {formik.touched.addr && formik.errors.addr && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {formik.errors.addr}
            </div>
          )}
          <input
            placeholder="Credit Card No"
            name="creditNo"
            id="creditNo"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.creditNo}
          />
          {formik.touched.creditNo && formik.errors.creditNo && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {formik.errors.creditNo}
            </div>
          )}
          <button type="submit">BUY NOW</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
