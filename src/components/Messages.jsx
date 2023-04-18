//prema: scaledrone tutorial 2018: https://github.com/ScaleDrone/react-chat-tutorial/blob/master/src/Messages.js
import React from "react";


const Messages = ({ currentMember, messages }) => {

  const renderMessage = (message) => {

    const { member, text } = message;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";

    return (
      <li key={currentMember.id} className={className}>
        <div className="Message-content">
          <div className="Message-user">
            <div className="color" style={{
              backgroundColor: member.clientData.color
            }}></div>
            <div className="username" style={{
              color: member.clientData.color
            }}>{member.clientData.username}</div>
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  };

  return <ul className="Messages-list">{messages.map((message) => renderMessage(message))}</ul>;
};

export default Messages;
