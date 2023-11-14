import React from "react";
import { Form, useNavigate } from "react-router-dom";
import { AdminAPI } from "../../apis/adminAPIs";
import styles from "./UpdateOrderForm.module.css";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import OrderDetailTable from "./OrderDetailTable";
function UpdateProductForm(props) {
  const { order } = props;
  const navigate = useNavigate();
  const [errs, setErrors] = useState();
  const [status, setStatus] = useState(order.status);
  const [delivery, setDelivery] = useState(order.delivery);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      orderId: order._id,
      status: status,
      delivery: delivery,
    };
    const res = await AdminAPI.updateOrder(formData);
    if (res.status === 200) {
      enqueueSnackbar("Update order success!", { variant: "success" });
      navigate("/dashboard");
    } else {
      setErrors(res.data.data);
      enqueueSnackbar("Update order fail!", { variant: "error" });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.container}>
      {errs && (
        <ul className={styles.errors}>
          {errs.map((err, index) => (
            <li key={index}>{err.msg}</li>
          ))}
        </ul>
      )}
      <div className={styles.container}>
        <div className={styles.customer_info}>
          <h2>Information Order</h2>
          <p>ID User: {order.user}</p>
          <p>Full Name: {order.customerInfo.fullName}</p>
          <p>Phone: {order.customerInfo.phone}</p>
          <p>Address: {order.customerInfo.address}</p>
          <p>Total: {order.price}</p>
        </div>
        <OrderDetailTable products={order.products} />
        <div>
          <label>Status: </label>
          <select id="status" onChange={(e) => setStatus(e.target.value)}>
            <option value={status}>{status}</option>
            <option value={"OK"}>OK</option>
            <option value={"waiting for waiting for paying"}>
              waiting for paying
            </option>
          </select>
        </div>
        <div>
          <label>Delivery: </label>
          <select id="delivery" onChange={(e) => setDelivery(e.target.value)}>
            <option value={order.delivery}>{order.delivery}</option>
            <option value={"OK"}>OK</option>
            <option value={"waiting for progressing"}>
              waiting for progressing
            </option>
          </select>
        </div>
      </div>
      <button type="submit">Update</button>
    </Form>
  );
}

export default UpdateProductForm;
