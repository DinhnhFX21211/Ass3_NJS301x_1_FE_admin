import React from "react";
import styles from "./ChatPage.module.css";
import ListRoomChat from "../../components/ChatPage/ListRoomChat/ListRoomChat";
import RoomChat from "../../components/ChatPage/RoomChat/RoomChat";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { socket } from "../../socket";
import openSocket from "socket.io-client";
import { URL } from "../../stores/deployUrl";
import { MessageAPI } from "../../apis/messageAPIs";
function ChatPage(props) {
  const [roomChats, setRoomChats] = useState([]);
  const [roomSelected, setRoomSelected] = useState();
  const listRoomChat = useMemo(
    () => roomChats.map((item) => item.roomId),
    [roomChats]
  );
  const selectedRoomChatText = roomChats.find(
    (item) => item.roomId === roomSelected
  );
  const fetchMessage = async () => {
    const res = await MessageAPI.getMessageAll();
    if (res.status === 200) {
      setRoomChats(res.data);
    }
  };
  useEffect(() => {
    fetchMessage();
  }, []);
  useEffect(() => {
    let flag = false;
    function getMessageFromServer(value) {
      flag = true;
      setRoomChats((prev) => {
        const updatedList = [...prev];
        const updatedRoomIndex = updatedList.findIndex(
          (room) => room.roomId === value.roomId
        );
        if (updatedRoomIndex > -1) {
          if (flag) {
            updatedList[updatedRoomIndex].chatsText.push(value.message);
            flag = false;
          }
        } else {
          const newRoomChat = {
            roomId: value.roomId,
            chatsText: [value.message],
          };
          updatedList.unshift(newRoomChat);
        }
        return updatedList;
      });
    }
    socket.on("chat", getMessageFromServer);
    return () => {
      socket.off("chat", getMessageFromServer);
    };
  }, []);
  const handleSelectRoomChat = (roomId) => {
    setRoomSelected(roomId);
  };

  const handleSubmitChat = (message) => {
    const socket = openSocket(URL);
    let objMess;
    if (roomSelected && message.trim()) {
      objMess = {
        type: "update",
        roomId: roomSelected,
        message: { from: "staff", text: message },
      };
      socket.emit("chat", objMess);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Chat</h3>
      <div className={styles.chat_panel}>
        <ListRoomChat
          onSelectRoom={handleSelectRoomChat}
          rooms={listRoomChat}
        />
        <RoomChat
          onSubmitChat={handleSubmitChat}
          chatsText={selectedRoomChatText?.chatsText || []}
        />
      </div>
    </div>
  );
}

export default ChatPage;
