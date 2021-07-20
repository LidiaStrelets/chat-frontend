import React, { Component } from 'react';
import Join from './components/Join';
import Chat from './components/Chat';
import backend from './servises/fetch';

class App extends Component {
  state = {
    email: '',
    pwd: '',
    status: 'default',
    // currentUser:''
  };
  componentDidMount() {
    const defaultStatus=localStorage.getItem('status')
    this.setState({status:defaultStatus?defaultStatus:'default'})
}
  componentDidUpdate(prevProps, prevState) {
    if (prevState.status !== this.state.status) {
      localStorage.setItem('status', this.state.status)
  }
}

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  handleSubmit = event => {
    event.preventDefault();
    const { email, pwd } = this.state;
    const data = {
      email,
      pwd,
    };
    
  
    backend.login(data).then(({ data }) => {
      const { user, isAdmin,message }=data.answer
       if (user) {
         this.setState({currentUser:user, isAdmin})
       } 
      localStorage.setItem('token', data.token)
  this.setState({status: message, email: '',
    pwd: '',
  })
     }).catch(error => {
       let errorForUser;
       if (error.response.data.errors) {
        errorForUser= error.response.data.errors.reduce((finalError, eItem) => 
           finalError +' '+ eItem.msg, '')
       }
       else {
         errorForUser=error.response.data.error
         console.log(errorForUser);
       }
       alert(errorForUser);
       this.setState({email: '',
    pwd: ''})
    })
  };

  handleChatExit = ()=>{
    this.setState({ status: 'default' })
    localStorage.removeItem('token')
    localStorage.removeItem('status')
  }

  
  
  render() {
    const {currentUser,isAdmin, status, email, pwd } = this.state;
    const shouldOpenChat = status === 'authorized';

    return <>
      {shouldOpenChat&&<Chat handleChatExit={this.handleChatExit} isAdmin={isAdmin} currentUser={currentUser} />}
       {status==='default'&& <Join handleSubmit={this.handleSubmit} 
       handleInputChange={this.handleInputChange} 
       pwd={ pwd} email = {email} userStatus={status}  />}
    </>;
  }
}

export default App;
