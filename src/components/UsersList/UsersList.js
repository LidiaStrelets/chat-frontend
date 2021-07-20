import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const UsersList = ({onlineUsers,allUsers,handleMute,handleBun}) => <ul className="chatUsersList">
          {onlineUsers.length>0&&onlineUsers.map(({ email }) => <li className="chatUserItem" key={uuidv4()}>
            <p className="chatUser">{email}</p>
              
          </li>)}
                 {allUsers.length > 0 && allUsers.map(({ email, muted, banned }) => <li className="chatUserItem" key={uuidv4()}>
                   <p className="chatUser">{email}</p>
                   <span onClick={()=>handleMute(email)} className="chatMute">{muted?'Unmute':'Mute'}</span>
                   <span onClick={()=>handleBun(email)} className="chatBun">{ banned?'Unbanne':'Banne'}</span>
                 </li>)}
            <li id="scrollUser"></li>
        </ul>
 
export default UsersList;