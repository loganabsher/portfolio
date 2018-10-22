'use strict';

import React from 'react';

import * as util from '../../../../lib/util'
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

const limitArr = [5, 10, 25, 50];

class RepoTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      repos: this.props.repos,
      offset: 0,
      limit: 5
    }
    // NOTE: these can all probably be put into one big event listener
    this.changeOffSet = this.changeOffSet.bind(this);
    this.changeLimit = this.changeLimit.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByDateCreated = this.sortByDateCreated.bind(this);
    this.sortByDateUpdated = this.sortByDateUpdated.bind(this);
    this.sortBySize = this.sortBySize.bind(this);
  }

  changeOffSet(e){
    let offset = parseInt(this.state.offset);
    let limit = parseInt(this.state.limit);
    if(e.target.textContent === '<'){
      if(offset - limit > 0){
        this.setState({offset: offset - limit});
      }else{
        this.setState({offset: 0});
      }
    }else{
      if(offset + limit < this.state.repos.length - limit){
        this.setState({offset: offset + limit});
      }else{
        this.setState({offset: this.state.repos.length - limit});
      }
    }
  }

  changeLimit(e){
    let offset = parseInt(this.state.offset);
    let limit = parseInt(this.state.limit);
    let selected = e.target.options[e.target.selectedIndex].value;
    if(parseInt(selected) + offset > this.state.repos.length){
      this.setState({offset: this.state.repos.length - parseInt(selected)});
    }
    this.setState({limit: selected});
  }

  sortByName(e){

  }

  sortByDateCreated(e){

  }

  sortByDateUpdated(e){

  }

  sortBySize(e){

  }

  render(){
    let offset = parseInt(this.state.offset);
    let limit = parseInt(this.state.limit);
    return(
      <div className='repo-table'>
        <ul className='sorting-items'>
          <li><h1>Repository Table</h1></li>
          <li><p> | </p></li>
          <li><p>{`${offset} - ${offset + limit}`}</p>
            <button onClick={this.changeOffSet}>{'<'}</button>
            <button onClick={this.changeOffSet}>{'>'}</button>
          </li>
          <li><p>items per page</p>
            <select onChange={this.changeLimit}>
              {limitArr.map((ele) => {
                return(<option value={ele}>{ele}</option>)
              })}
            </select>
          </li>
        </ul>
        <table>
          <thead id='repo-table-head'>
            <tr>
              <th><button onClick={this.sortByName}>name</button></th>
              <th><button onClick={this.sortByName}>language</button></th>
              <th><button onClick={this.sortByName}>forks</button></th>
              <th><button onClick={this.sortByName}>watchers</button></th>
              <th><button onClick={this.sortByDateCreated}>date created</button></th>
              <th><button onClick={this.sortByDateUpdated}>last update</button></th>
              <th><button onClick={this.sortBySize}>size</button></th>
            </tr>
          </thead>
          <tbody id='repo-table-body'>
          {this.state.repos.slice(offset, (offset + limit)).map((ele, index) => {
            return(
              <tr key={index} style={{background: index % 2 === 0 ? '#F0F0F0' : '#F7F7F7'}}>
                <td>{ele.name}</td>
                <td>{ele.language}</td>
                <td>{ele.forks}</td>
                <td>{ele.watchers}</td>
                <td>{new Date(ele.created_at).toString()}</td>
                <td>{new Date(ele.updated_at).toString()}</td>
                <td>{ele.size}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default RepoTable;
