'use strict';

import React from 'react';

class AuthForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      type: 'login',
      error: false,
      emailError: false,
      passwordError: false,
      submitted: false
    };

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // NOTE: the differences between signup and login will become more apparent when the schema is changed, but for now they are pretty much the same in terms of feilds requried
  handleTypeChange(){
    if(this.state.type === 'submit') this.setState({type: 'login'});
    if(this.state.type === 'login') this.setState({type: 'submit'});
  }

  handleChange(e){
    let {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit(e){
    e.preventDefault();
    if(!this.state.error){
      this.props.onComplete(this.state)
        .then(() => this.setState({email: '', password: ''}))
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
      <div className='auth-form'>
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
          <button type='submit'>Submit</button>
        </form>
        <button onClick={this.handleTypeChange}>{this.state.type}</button>
      </div>
    );
  }

}

export default AuthForm;
