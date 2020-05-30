import React, { useState } from "react";
import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { db } from "../../services/firebase";

const onEnterPress = (
  e: any,
  setMessage: any,
  message: string,
  combinedUid: string,
  userId: string
) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage(message, combinedUid, userId);
    setMessage("");
  }
};

const sendMessage = async (
  message: string,
  combinedUid: string,
  userId: string
) => {
  if (!message.length) return null;
  try {
    const req = await db.ref("chats/" + combinedUid).push({
      message: message,
      timestamp: Date.now(),
      uid: userId
    });
  } catch (err) {
    console.log(err);
  }
};

const Message = ({ chat, combinedUid, user, selectedUser }: any) => {
  const [message, setMessage] = useState("");

  if (!selectedUser || !user) return <div className="loader">Loading...</div>;
  return (
    <div className="message">
      <div className="send-message">
        <Input
          value={message}
          onChange={e => setMessage(e.currentTarget.value)}
          onKeyPress={e => {
            onEnterPress(e, setMessage, message, combinedUid, user.uid);
          }}
          placeholder="Écrivez un message..."
          className="input"
        />
        <Button
          type="primary"
          onClick={() => {
            sendMessage(message, combinedUid, user.uid);
            setMessage("");
          }}
          icon={<SendOutlined className="icon" />}
          className="button"
        ></Button>
      </div>
      <ol className="message-box">
        {chat.map((message: any, key: number) => {
          let who = "other";
          if (message.uid === user.uid) who = "self";
          return (
            <li className={who} key={key}>
              <div></div>
              <div className="msg">{message.message}</div>
            </li>
          );
        })}
      </ol>
      <div className="head">
        <div className="title">{selectedUser.usermame}</div>
        <div className="pic">
          <img src={selectedUser.profilPic} />
        </div>
      </div>
    </div>
  );
};

export default Message;
