'use strict';

import React from 'react';

class LoginForm extends React.Compenent{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false,
      emailError: false,
      passwordError: false,
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    let {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit(e){
    e.preventDefault();
    if(!this.state.error){
      this.props.onComplete(this.state)
        .then(() => this.setState({username: '', email: '', password: ''}))
        .catch((error) => {
          console.error(error);
          this.setState({
            error,
            submitted: true,
          });
        });
    }
    this.setState((state) => ({
      submitted: true,
      emailError: state.emailError || state.email ? null : 'required',
      passwordError: state.passwordError || state.password ? null : 'required',
    }));
  }

  render(){
    return(
      <form>
        <input
          className='login'
          type='text'
          name='email'
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          className='login'
          type='text'
          name='password'
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button type='submit'>Login</button>
      </form>
    );
  }

}

export default LoginForm;
