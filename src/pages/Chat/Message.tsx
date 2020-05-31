import React, { useState, useEffect, createRef } from "react";
import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import onEnterPress from "../../helpers/onEnterPress";
import sendMessage from "../../helpers/SendMessage";

const Message = ({ chat, combinedUid, user, selectedUser }: any) => {
  const [message, setMessage] = useState("");

  const botRef = createRef<HTMLLIElement>();

  //scrollDown on New message

  useEffect(() => {
    if (botRef.current !== null) {
      console.log("scroosa;p[e");
      botRef.current.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
    }
  }, [chat]);

  if (!selectedUser || !user) return <div className="loader">Loading...</div>;

  return (
    <div className="message">
      <div className="send-message">
        <Input
          value={message}
          onChange={e => setMessage(e.currentTarget.value)}
          onKeyPress={e => {
            onEnterPress(e, () => {
              sendMessage(message, combinedUid, user.uid);
              setMessage("");
            });
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
          let who = message.uid === user.uid ? "self" : "other";
          return (
            <li className={who} key={key}>
              <div></div>
              <div className="msg">{message.message}</div>
            </li>
          );
        })}
        <li className="scrollTo" ref={botRef}></li>
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
