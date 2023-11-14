import React, { useRef, useState, useEffect } from "react";
import styles from "./MessageItem.module.css";

function MessageItem(props) {
  const {
    data: { from, text },
  } = props;
  return (
    <div className={styles.container}>
      {props.data.from === "client" ? (
        <div className={styles.client}>
          <i className="fa fa-user"></i>
          <p>{text}</p>
        </div>
      ) : (
        <div className={styles.staff}>
          <p>{text}</p>
          <i className="fa fa-female"></i>
        </div>
      )}
    </div>
  );
}

export default MessageItem;
