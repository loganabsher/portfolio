'use strict';

import React from 'react';

class SignupForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false
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
        .catch((err) => {
          console.error(err);
          this.setState({
            error,
            submitted: true,
          });
        });
    }
    this.setState((state) => ({
      submitted: true,
      usernameError: state.usernameError || state.username ? null : 'required',
      emailError: state.emailError || state.email ? null : 'required',
      passwordError: state.passwordError || state.password ? null : 'required',
    }));
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <section>
          <h2>signup</h2>
          <input
            type='text'
            name='email'
            placeholder='email'
            value={this.state.email}
            onChange={this.handleChange}
          />

          <input
            type='password'
            name='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
        </section>
        <button type='submit'>Signup</button>
      </form>
    );
  }
}



export default SignupForm;
