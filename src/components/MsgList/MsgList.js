import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const MsgList = ({messages,email}) => <ul className="chatList">
          {messages.map(({ user, text,color }) => <li style={{
                backgroundColor: color,
              }} className={user===email?"chatMsgItem chatMsgItemInner":"chatMsgItem chatMsgItemOuter"} key={uuidv4()}>
            <p  className="chatAuthor">{user}</p>
            <p  className="chatMsg">{ text}</p>
          </li>)}
            <li id="scrollMessage"></li>
        </ul>
 
export default MsgList;