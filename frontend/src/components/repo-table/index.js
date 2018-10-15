'use strict';

import React from 'react';

import * as util from '../../../lib/util'
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

class RepoTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataArr = this.props.dataArr
    }
  }

  render(){
    return(
      <div className='repo-table'>
        <table>
          <thead id='repo-table-head'>
            <tr>
              <th>name</th>
              <th>date created</th>
              <th>last update</th>
              <th>size</th>
            </tr>
          </thead>
          <tbody id='repo-table-body'>
          {this.state.dataArr.map((ele, index) => {
            return(
              <tr key={index} style={{background: index % 2 === 0 ? '#F0F0F0' : '#F7F7F7'}}>
                <td>{ele.FirstName}</td>
                <td>{ele.LastName}</td>
                <td>{ele.Country}</td>
                <td>{ele.Street}</td>
                <td>{ele.City}</td>
                <td>{ele.State}</td>
                <td>{ele.Zip}</td>
                <td>{ele.Phone}</td>
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
