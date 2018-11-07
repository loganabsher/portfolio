'use strict';

import React from 'react';

const limitArr = [5, 10, 25, 50, 'all'];

class RepoTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      repos: this.props.repos,
      offset: 0,
      limit: 5
    };

    this.changeOffSet = this.changeOffSet.bind(this);
    this.changeLimit = this.changeLimit.bind(this);
    this.sortByNumberOrLetter = this.sortByNumberOrLetter.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
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
    let selected = e.target.options[e.target.selectedIndex].value;
    if(selected === 'all'){
      this.setState({offset: 0, limit: this.state.repos.length});
    }else{
      this.setState({limit: selected});
    }
    if(parseInt(selected) + offset > this.state.repos.length){
      this.setState({offset: this.state.repos.length - parseInt(selected)});
    }
  }

  sortByDate(e){
    this.setState({repos: this.state.repos.sort((a, b) => {
      console.log(e.target.value);
    })});
  }

  sortByNumberOrLetter(e){
    this.setState({repos: this.state.repos.sort((a, b) => {
      let sorting = e.target.value.split(' ').join('');
      console.log(sorting)
      if(a[sorting] < b[sorting]){
        return -1;
      }else if(a[sorting] > b[sorting]){
        return 1;
      }else{
        return 0;
      }
    })});
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
              {limitArr.map((ele, index) => {
                return(<option key={index} value={ele}>{ele}</option>);
              })}
            </select>
          </li>
        </ul>
        <table>
          <thead id='repo-table-head'>
            <tr>
              <th><button value="name" onClick={this.sortByNumberOrLetter}>name</button></th>
              <th><button value="language" onClick={this.sortByNumberOrLetter}>language</button></th>
              <th><button value="forks" onClick={this.sortByNumberOrLetter}>forks</button></th>
              <th><button value="watchers" onClick={this.sortByNumberOrLetter}>watchers</button></th>
              <th><button value="date created" onClick={this.sortByDate}>date created</button></th>
              <th><button value="last update" onClick={this.sortByDate}>last update</button></th>
              <th><button value="size" onClick={this.sortByNumberOrLetter}>size</button></th>
            </tr>
          </thead>
          <tbody id='repo-table-body'>
            {this.state.repos.slice(offset, (offset + limit)).map((ele, index) => {
              return(
                <tr key={index} style={{background: index % 2 === 0 ? '#F0F0F0' : '#F7F7F7'}}>
                  <td><a>{ele.name}</a></td>
                  <td>{ele.language}</td>
                  <td>{ele.forks}</td>
                  <td>{ele.watchers}</td>
                  <td>{new Date(ele.created_at).toLocaleDateString('en-US')}</td>
                  <td>{new Date(ele.updated_at).toLocaleDateString('en-US')}</td>
                  <td>{ele.size}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RepoTable;
