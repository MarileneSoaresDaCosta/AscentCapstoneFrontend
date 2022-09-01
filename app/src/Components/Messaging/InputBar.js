// state to keep track of message being typed
import React, {useState} from 'react';

const InputBar = ({handleSend, handleMessage}) => {

  // const [message, setMessage] = useState("");

  // const handleMessage = (event) => {
  //   event.preventDefault();
  //   const value = event.target.value;
  //   setMessage(value);
  // }

  // const handleSendButton = (event) => {
  //   event.preventDefault();
  //   handleSend(message);
  //   setMessage("");
  // }

  return (
    <div>
    <div>Input Bar</div>
    <input type='text' className='input-message' name='message' placeholder={`Enter message`}
                  onChange={(event) => handleMessage(event)}/>
                <button type='button' className='send-button' onClick={(event) => {handleSend()}}>send</button>
    </div>
  )
}

export default InputBar;