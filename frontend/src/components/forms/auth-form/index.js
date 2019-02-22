'use strict';

import './_auth-form.scss';

import React from 'react';
import PropTypes from 'prop-types';

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
    };

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // NOTE: the differences between signup and login will become more apparent when the schema is changed, but for now they are pretty much the same in terms of feilds requried
  handleTypeChange(){
    if(this.state.type == 'login'){
      this.setState({type: 'signup'});
    }else{
      this.setState({type: 'login'});
    }
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
          });
        });
    }
    this.setState((state) => ({
      emailError: state.emailError || state.email ? null : 'required',
      passwordError: state.passwordError || state.password ? null : 'required',
    }));
  }

  render(){
    return(
      <div className='auth-form'>
        <form>
          <h2>{this.state.type}</h2>
          <input
            className='login'
            type='text'
            name='email'
            placeholder='email'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            className='login'
            type='password'
            name='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type='submit' onClick={this.handleSubmit}>Submit</button>
        </form>
        <button onClick={this.handleTypeChange}>{this.state.type == 'login' ? 'signup' : 'login'}</button>
      </div>
    );
  }
}

AuthForm.PropTypes = {
  onComplete: PropTypes.func
};

export default AuthForm;
