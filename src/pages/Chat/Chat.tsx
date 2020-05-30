import React, { useEffect, useState, useRef, useImperativeHandle } from "react";
import { MessageOutlined } from "@ant-design/icons";
import "../../styles/chat.scss";
import { db } from "../../services/firebase";
import _ from "lodash";

import Header from "./Header";
import Message from "./Message";

const Chat = ({ user }: any) => {
  const [selected, setSelected]: [
    number,
    (selected: number) => void
  ] = useState(0);
  const [chat, setChat]: any = useState([]);
  const [friends, setFriends]: any = useState([]);
  const [combinedUid, setCombinedUid]: any = useState("");
  const [lastMessage, setLastMessage]: any = useState("");
  const [self, setSelf]: any = useState("");

  if (friends.length && !combinedUid.length) {
    let sortedUid = [user.uid, friends[selected].uid].sort();
    setCombinedUid(sortedUid[0] + "_" + sortedUid[1]);
  }

  useEffect(() => {
    if (user && friends.length) {
      let sortedUid = [user.uid, friends[selected].uid].sort();
      setCombinedUid(sortedUid[0] + "_" + sortedUid[1]);
      db.ref(combinedUid).on("value", snapshot => {
        let chats = _.toArray(snapshot.val());
        setChat(chats);
      });
    }
  }, [selected]);

  useEffect(() => {
    if (combinedUid.length) {
      try {
        let ref = db.ref("chats/" + combinedUid);
        ref.on("value", snapshot => {
          let chats: any[] = [];
          snapshot.forEach(snap => {
            chats.push(snap.val());
            setLastMessage(chats[chats.length - 1]);
          });
          setChat(chats);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [combinedUid]);

  useEffect(() => {
    if (user) {
      db.ref("users")
        .once("value")
        .then(snapshot => {
          let usrs = _.toArray(snapshot.val());
          usrs.map((usr, key) => {
            usr.profilPic = `../assets/profilpic/${key % 10}.jpeg`;
          });
          setFriends(usrs.filter(fireuser => fireuser.uid !== user.uid));
          setSelf(...usrs.filter(fireuser => fireuser.uid === user.uid));
        })
        .catch(err => {
          console.log("Error ", err);
        });
    }
  }, [user]);
  if (user) {
    return (
      <div className="chatContainer">
        <div className="topbar">
          <div className="container">
            <MessageOutlined className="icon"></MessageOutlined>
            <div className="username">{self.usermame}</div>
          </div>
        </div>
        <div className="chat">
          <Header
            selected={selected}
            setSelected={setSelected}
            friends={friends}
            setFriends={setFriends}
            lastMessage={lastMessage}
          ></Header>
          <Message
            user={user}
            combinedUid={combinedUid}
            chat={chat}
            selectedUser={friends[selected]}
          ></Message>
          {/* <div className="connected">Connected epoples</div> */}
        </div>
      </div>
    );
  } else return null;
};

export default Chat;
