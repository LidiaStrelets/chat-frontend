import React from 'react';

const ChatForm = ({handleSubmit, currentMsg, handleInput}) => <form className="chatForm" onSubmit={handleSubmit}>
    <label className="chatLabel">Type to the chat:
        <input
            autoFocus
            maxLength="200"
            className="chatInput"
            type="text"
            value={currentMsg}
            onChange={handleInput} />
    </label>
      <button className="sendBtn" type="submit">Send</button>
      </form>
 
export default ChatForm;