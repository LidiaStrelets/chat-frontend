import React, { Component } from 'react';
import io from 'socket.io-client';
import UsersList from '../UsersList';
import MsgList from '../MsgList';
import ChatForm from '../ChatForm';
import './Chat.scss'
let socket;

class Chat extends Component {
  state = {
    email: '',
    currentMsg: '',
    messages: [],
    isAdmin: null,
    onlineUsers: [],
    allUsers: []
  }

  componentDidMount() {
    this.setState({
      //  email: this.props.currentUser,
      isAdmin: this.props.isAdmin
    })

    socket = io('https://chat-app-maybe.herokuapp.com/', {
      transports: ["websocket"],
      auth: {
        token: localStorage.getItem('token')
      }
    });

    socket.on('currentUser', ({ email }) => {
      this.setState({ email })
    })

    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    document.querySelector("#scrollMessage")
      .scrollIntoView({ behavior: "smooth" })
    //  const socketEmail = this.props.currentUser
    socket.emit('join',
      // { socketEmail },
      (error) => {
        if (error) {
          //  this.props.handleChatExit()
          alert(error)
          //  socket.disconnect()
        }
      })

    socket.on('message', (message) => {
      this.setState(prevState => ({
        messages: [...prevState.messages, message]
      }))
    })

    socket.on('msgsFromDB', (message) => {
      this.setState(prevState => ({
        messages: [...prevState.messages, message]
      }))
    })

    socket.on("disconnect",
      (reason) => {
        console.log(reason);
        if (reason === "io server disconnect") {
          alert(`Check if you have another opened tab with this email. If no - you was banned by chat administration and can't enter for a while`)
        }
        socket.disconnect()
        this.props.handleChatExit()
        //  alert('Unfortunately, you are banned and cant join the chat')

      }
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.messages.length < this.state.messages.length) {
      document.querySelector("#scrollMessage").scrollIntoView({ behavior: "smooth" })
    }
    if (prevState.onlineUsers.length < this.state.onlineUsers.length) {
      document.querySelector("#scrollUser").scrollIntoView({ behavior: "smooth" })
    }
    if (prevState.allUsers.length < this.state.allUsers.length) {
      document.querySelector("#scrollUser").scrollIntoView({ behavior: "smooth" })
    }


    if (prevState.isAdmin !== this.state.isAdmin) {
      if (this.state.isAdmin) {
        socket.on('usersForAdmin', (socketResponce) => {
          this.setState({ allUsers: socketResponce.usersForAdmin })
        })
      }
      else {
        socket.on("info", ({ onlineUsers }) => {
          this.setState({ onlineUsers })
        })
      }
    }
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  handleInput = event => {
    this.setState({ currentMsg: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault();
    this.sendMsg()
  }

  sendMsg = () => {
    socket.emit("userMsg", this.state.currentMsg, () => { this.setState({ currentMsg: '' }) })
  }

  handleMute = (email) => {
    socket.emit("mute", email, () => {
    })
  }
  handleBun = (email) => {
    socket.emit("bun", email, () => {
    })
  }

  handleExitBtn = () => {
    this.props.handleChatExit()
    socket.disconnect()
  }

  render() {

    const { onlineUsers, allUsers, messages, email, currentMsg } = this.state;
    return (<div className="box">
      <h1 className="chatTitle">Chat</h1>
      <ChatForm handleInput={this.handleInput} currentMsg={currentMsg} handleSubmit={this.handleSubmit} />
      <div className="innerContainer">
        <div className="messagesBox">
          <MsgList email={email} messages={messages} />
        </div>
        <div className="onlineUsersBox">
          <h2 className="chatSubtitle">{this.state.onlineUsers.length > 0 ? 'Online this moment:' : 'All users:'}</h2>
          <UsersList handleBun={this.handleBun} handleMute={this.handleMute} onlineUsers={onlineUsers} allUsers={allUsers} />
        </div>
      </div>
      <button className="exitBtn" type="button" onClick={this.handleExitBtn}>Exit</button>
    </div>
    );
  }
}

export default Chat;
