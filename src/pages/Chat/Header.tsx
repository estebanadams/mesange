import React from "react";

interface Header {
  selected: number;
  setSelected: (selected: number) => void;
  friends: any[];
  setFriends: (friends: any[]) => void;
  lastMessage: any;
}

const Header = ({
  selected,
  setSelected,
  friends,
  setFriends,
  lastMessage
}: Header) => {
  return (
    <div className="header-container">
      {friends.map((user: any, key: any) => {
        let addClass = "";
        if (key === selected) addClass = "selected";
        return (
          <div
            className={"header " + addClass}
            key={key}
            onClick={() => {
              setSelected(key);
            }}
          >
            <div className="icon">
              <img src={user.profilPic} alt="" />
            </div>
            <div className="info">
              <div className="pseudo">{user.usermame}</div>
              {/* <div className="last-message">{lastMessage.message}</div> */}
            </div>
            {/* <div className="date">18:04</div> */}
          </div>
        );
      })}
    </div>
  );
};

export default Header;
