//prema: scaledrone tutorial 2018: https://github.com/ScaleDrone/react-chat-tutorial/blob/master/src/Input.js

import React, { useState } from "react";


const Input = (props) => {

  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);

  }

  const onSubmit = (e) => {
    e.preventDefault();
    setText('');
    props.onSendMessage(text);

  }


  return (
    <div className="Input">
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Write your message and press ENTER"
          maxLength={130}
        />
        <button disabled={text === "" ? true : false}>Send</button>
      </form>
    </div>

  )

}

export default Input;