// prema: scaledrone tutorial 2018: https://github.com/ScaleDrone/react-chat-tutorial/blob/master/src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import Messages from './components/Messages';
import Input from './components/Input';
import Header from './components/Header';
import Footer from './components/Footer';




//Creating user
const randomName = () => {
  const adjectives = [
    "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
    "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
    "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
    "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long",
    "late", "lingering", "bold", "little", "morning", "muddy", "old", "red",
    "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering",
    "withered", "wild", "black", "young", "holy", "solitary", "fragrant",
    "aged", "snowy", "proud", "floral", "restless", "divine", "polished",
    "ancient", "purple", "lively", "nameless"
  ];
  const nouns = [
    "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
    "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
    "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
    "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
    "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
    "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
    "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
    "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog",
    "smoke", "star"
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

const randomColor = () => {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

// App
const App = () => {

  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
  });
  const [drone, setDrone] = useState(null);

  useEffect(() => {
    const drone = new window.Scaledrone("LWiQ0FNiVMhXnBu0", {
      data: member,
    });

    setDrone(drone);
  }, []);

  useEffect(() => {
    if (drone) {
      const room = drone.subscribe("observable-room");

      drone.on("open", (error) => {
        if (error) {
          console.error(error);
        } else {
          setMember(prevMember => ({
            ...prevMember,
            id: drone.clientId
          }));
        }
      });

      room.on("data", (message, member) => {
        setMessages(prevMessages => [...prevMessages, { text: message, member: member }]);
      });
    }
  }, [drone]);

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message
    });
  }

  return (
    <div className="App">
      <Header />
      <div className='Messages-wrapper'>
        <Messages messages={messages} currentMember={member} />
      </div>
      <Input onSendMessage={onSendMessage} />
      <Footer />
    </div>

  );
};


export default App;
