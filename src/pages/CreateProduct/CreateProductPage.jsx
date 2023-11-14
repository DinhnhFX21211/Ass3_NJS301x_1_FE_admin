import React from "react";
import styles from "./CreateProductPage.module.css";
import CreateProductForm from "../../components/CreateProductPage/CreateProductForm/CreateProductForm";

function CreateProductPage(props) {
  return (
    <div className={styles.container}>
      <h3>Create new Product</h3>
      <CreateProductForm />
    </div>
  );
}

export default CreateProductPage;
