import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import styles from './Join.module.css';
import './Join.scss'


class Join extends Component {
  state = {
    userStatus:'not defined'
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userStatus !== this.props.userStatus) {
      this.setState({status: 'no such user'})
    }
  }

  render() {
    const {  pwd, email, handleInputChange,handleSubmit } = this.props;
    const formStyles = [styles.form, 'joinForm'].join(' ');
    const labelStyles = [styles.label, 'joinLabel'].join(' ');
    const inputStyles = [styles.label, 'joinInput'].join(' ');
    const titleStyles = [styles.title, 'joinTitle'].join(' ');
    return (
      <>
        <h1 className={titleStyles}>Join the online chat as:</h1>
        
        <form className={formStyles} onSubmit={handleSubmit}>
          <label className={labelStyles}>
            E-mail:{' '}
            <input
              autoFocus
              autoComplete="off"
              className={inputStyles}
              placeholder="Email"
              name="email"
              value={email}
              type="text"
              onChange={handleInputChange}
            />
          </label>
          <label className={labelStyles}>
            Password:{' '}
            <input
              autoComplete="off"
              className={inputStyles}
              placeholder="Password"
              name="pwd"
              value={pwd}
              type="password"
              onChange={handleInputChange}
            />
          </label>
          {email && pwd &&
             <button className={styles.btn} type="submit">
              Sign up
            </button>}
        </form>
      </>
    );
  }
}

export default Join;
