import React, { useRef, useState, useEffect } from "react";
import styles from "./ListRoomChat.module.css";

function ListRoomChat(props) {
  const { onSelectRoom, rooms } = props;
  const handleSelect = (roomId) => {
    onSelectRoom(roomId);
  };
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [props]);
  const scroll = useRef();
  return (
    <div className={styles.container}>
      <input type="text" placeholder="Search contact" />
      {rooms.length > 0 && (
        <ul className={styles.list}>
          {rooms.map((item, index) => (
            <li
              ref={scroll}
              key={index}
              onClick={() => handleSelect(item)}
              className={styles.room_chat}
            >
              <i className="fa-regular fa-user"></i>
              {item}
            </li>
          ))}
        </ul>
      )}
      {rooms.length === 0 && <p>Chat rooms not found</p>}
    </div>
  );
}

export default ListRoomChat;
