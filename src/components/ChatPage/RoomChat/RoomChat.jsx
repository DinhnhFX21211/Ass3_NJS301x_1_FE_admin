import React, { useRef, useState, useEffect } from "react";
import styles from "./RoomChat.module.css";
import MessageItem from "../MessageItem/MessageItem";
import { Form } from "react-router-dom";

function RoomChat(props) {
  const { chatsText, onSubmitChat } = props;
  const scroll = useRef();
  const handleSubmitMess = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    onSubmitChat(formProps.message);
    event.target.reset();
  };
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [props]);
  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {chatsText.length > 0 && (
          <>
            {chatsText.map((item, index) => (
              <div ref={scroll} className={styles.messages2} key={index}>
                <MessageItem data={item} />
              </div>
            ))}
          </>
        )}
      </div>
      <Form onSubmit={handleSubmitMess} className={styles.prompt}>
        <input type="text" name="message" placeholder="Type and enter" />
        <button type="submit">
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </Form>
    </div>
  );
}

export default RoomChat;
