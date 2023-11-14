import React from "react";
import { AdminAPI } from "../../apis/adminAPIs";
import { useLoaderData } from "react-router-dom";
import styles from "./UpdateOrderPage.module.css";
import UpdateOrderForm from "../../components/UpdateOrderPage/UpdateOrderForm";

function UpdateOrderPage(props) {
  const data = useLoaderData();
  return (
    <div className={styles.container}>
      <h3>Update Order</h3>
      {data && <UpdateOrderForm order={data} />}
      {!data && <p>Something went wrong</p>}
    </div>
  );
}

export default UpdateOrderPage;

export const loader = async ({ params }) => {
  const orderId = params.orderId;
  const res = await AdminAPI.getOrderDetails(orderId);
  if (res.status === 200) {
    return res.data;
  }
  return null;
};
