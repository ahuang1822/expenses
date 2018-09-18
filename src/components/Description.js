import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import '../Description.css';

class Description extends Component {
  
  handleSubmit = (event) => {
    event.preventDefault();
  }

  goBack = (event) => {
    event.preventDefault();
    browserHistory.push('/category')
  }

  render() {
    console.log('DESC: ', this.props.category);
    return (
      <div className="everything">
        <div className="input">
          <form onSubmit={this.handleSubmit}>
            <label>
              Description:
              <input type="text" name="category" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="home-button">
          <button onClick={this.goBack}>Back</button>
        </div>        
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    category: state.expense.category
  }
}

export default connect(mapState, null)(Description);